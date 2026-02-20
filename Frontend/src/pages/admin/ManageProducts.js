import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../services/productService';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './ManageProducts.css';

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        alert('Product deleted successfully');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  if (loading) {
    return <div className="loading-state">Loading products...</div>;
  }

  return (
    <div className="manage-products-page">
      <div className="manage-products-header">
        <h1>Manage Products</h1>
        <button 
          className="add-product-btn"
          onClick={() => navigate('/admin/add-product')}
        >
          + Add New Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No products added yet</p>
          <button 
            className="btn-add"
            onClick={() => navigate('/admin/add-product')}
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="card-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(product._id)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(product._id)}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="product-image">
                <img 
                  src={`http://localhost:5001${product.image}`} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price}</p>
                <span className="product-category">{product.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProducts;