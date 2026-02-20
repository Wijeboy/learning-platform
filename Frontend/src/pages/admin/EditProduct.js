import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../services/productService';
import './AddProduct.css';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [existingImage, setExistingImage] = useState('');
  const [existingPdf, setExistingPdf] = useState('');

  const languages = ['English', 'German', 'French', 'Spanish', 'Sinhala'];
  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      const product = response.data;
      
      setFormData({
        title: product.title,
        price: product.price,
        language: product.language,
        category: product.category,
        description: product.description
      });
      
      setExistingImage(product.image);
      setImagePreview(`http://localhost:5001${product.image}`);
      
      if (product.pdfResource) {
        setExistingPdf(product.pdfResource);
        setPdfName('Existing PDF attached');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product details');
    }
  };

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
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('language', formData.language);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      
      if (image) {
        formDataToSend.append('image', image);
      }
      
      if (pdfResource) {
        formDataToSend.append('pdfResource', pdfResource);
      }

      await updateProduct(id, formDataToSend);
      alert('Product updated successfully!');
      navigate('/admin/manage-products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h1 className="add-product-title">Update Product</h1>

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
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <p>Click to upload new image</p>
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
            {loading ? 'Updating Product...' : 'Update Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;