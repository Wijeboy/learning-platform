import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPurchase } from '../../services/purchaseService';
import { useAuth } from '../../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });

  React.useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (user?.userType !== 'student') {
      alert('Only students can make purchases');
      navigate('/');
      return;
    }
  }, [isAuth, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle expiry date formatting
    if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      setFormData({
        ...formData,
        [name]: formattedValue
      });
    } else if (name === 'cardNumber') {
      // Only allow numbers for card number
      const numericValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else if (name === 'cvv') {
      // Only allow numbers and max 3 digits for CVV
      const numericValue = value.replace(/\D/g, '').slice(0, 3);
      setFormData({
        ...formData,
        [name]: numericValue
      });
    } else if (name === 'nameOnCard') {
      // Only allow letters and spaces
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({
        ...formData,
        [name]: lettersOnly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate expiry date format
    if (formData.expiryDate.length !== 5) {
      alert('Please enter a valid expiry date (MM/YY)');
      return;
    }

    // Validate CVV
    if (formData.cvv.length !== 3) {
      alert('CVV must be 3 digits');
      return;
    }

    setLoading(true);

    try {
      await createPurchase(formData);
      alert('Purchase completed successfully!');
      navigate('/student/dashboard');
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert(error.message || 'Failed to process purchase');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Add Your Payment Details</h1>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Card Number */}
          <div className="form-group">
            <label className="form-label required">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="1234567890123456"
              maxLength="16"
              required
            />
          </div>

          {/* Name on Card */}
          <div className="form-group">
            <label className="form-label required">Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>

          {/* Expiry Date and CVV */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label required">Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="form-input"
                placeholder="MM/YY"
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="form-input"
                placeholder="123"
                maxLength="3"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="proceed-btn"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;