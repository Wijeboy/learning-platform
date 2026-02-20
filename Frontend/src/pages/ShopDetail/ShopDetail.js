import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../../services/productService';
import { addToCart } from '../../services/cartService';
import { useAuth } from '../../context/AuthContext';
import './ShopDetail.css';

const ShopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuth) {
      alert('Please login to add products to cart');
      navigate('/login');
      return;
    }

    if (user?.userType !== 'student') {
      alert('Only students can purchase products');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(id);
      alert('Product added to cart successfully!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert(error.message || 'Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="loading-state">Loading product...</div>;
  }

  if (!product) {
    return <div className="error-state">Product not found</div>;
  }

  return (
    <div className="shop-detail-page">
      <div className="shop-detail-container">
        <div className="product-detail-grid">
          {/* Product Image */}
          <div className="product-detail-image">
            <img 
              src={`http://localhost:5001${product.image}`} 
              alt={product.title}
              onError={(e) => {
                e.target.src = '/placeholder-image.png';
              }}
            />
          </div>

          {/* Product Info */}
          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.title}</h1>
            <p className="product-detail-price">${product.price}</p>
            
            <p className="product-guide-text">
              By purchasing this product, you can refer the comprehensive guide attached to this in pdf format
            </p>

            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value category-badge">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Language:</span>
                <span className="meta-value">{product.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="product-description-section">
          <h2 className="description-title">Description</h2>
          <p className="description-text">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;