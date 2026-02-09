import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../services/productService';
import './AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    language: '',
    category: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfResource, setPdfResource] = useState(null);
  const [pdfName, setPdfName] = useState('');

  const languages = ['English', 'German', 'French', 'Spanish', 'Sinhala'];
  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfResource(file);
      setPdfName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please upload a product image');
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', image);
      if (pdfResource) {
        formDataToSend.append('pdfResource', pdfResource);
      }

      await createProduct(formDataToSend);
      alert('Product added successfully!');
      navigate('/admin/manage-products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert(error.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h1 className="add-product-title">Add a New Product</h1>

        <form onSubmit={handleSubmit} className="add-product-form">
          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label required">Product Image</label>
            <div className="image-upload-section">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <p>Click to upload image</p>
                  </div>
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="form-group">
            <label className="form-label required">Add Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label className="form-label required">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Language */}
          <div className="form-group">
            <label className="form-label required">Select a Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label required">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label required">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows="5"
              required
            />
          </div>

          {/* PDF Upload */}
          <div className="form-group">
            <label className="form-label">Upload Resource (PDF)</label>
            <div className="pdf-upload-section">
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                id="pdf-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="pdf-upload" className="pdf-upload-btn">
                {pdfName ? pdfName : 'Choose PDF file'}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;