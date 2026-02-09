import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart } from '../../services/cartService';
import { useAuth } from '../../context/AuthContext';
import { FiTrash2 } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
      return;
    }

    if (user?.userType !== 'student') {
      alert('Only students can access cart');
      navigate('/');
      return;
    }

    fetchCart();
  }, [isAuth, user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove product from cart');
    }
  };

  const calculateSubtotal = () => {
    if (!cart || !cart.products) return 0;
    return cart.products.reduce((total, item) => {
      return total + (item.product?.price || 0);
    }, 0);
  };

  if (loading) {
    return <div className="loading-state">Loading cart...</div>;
  }

  const subtotal = calculateSubtotal();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        {!cart || cart.products.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="btn-shop"
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-items-grid">
                {cart.products.map((item) => (
                  <div key={item.product._id} className="cart-item-card">
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemove(item.product._id)}
                      title="Remove from cart"
                    >
                      <FiTrash2 />
                    </button>

                    <div className="cart-item-image">
                      <img 
                        src={`http://localhost:5001${item.product.image}`} 
                        alt={item.product.title}
                        onError={(e) => {
                          e.target.src = '/placeholder-image.png';
                        }}
                      />
                    </div>

                    <div className="cart-item-info">
                      <h3 className="cart-item-title">{item.product.title}</h3>
                      <p className="cart-item-price">${item.product.price}</p>
                      <span className="cart-item-category">{item.product.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>

              <button 
                className="buy-now-btn"
                onClick={() => navigate('/checkout')}
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;