import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../../services/productService';
import { FiFilter } from 'react-icons/fi';
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    priceRanges: []
  });

  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];
  const languages = ['English', 'German', 'French', 'Spanish', 'Sinhala'];
  const priceRanges = [
    { label: '$10-$15', min: 10, max: 15 },
    { label: '$15-$25', min: 15, max: 25 },
    { label: '$25-$40', min: 25, max: 40 }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLanguageChange = (language) => {
    setFilters(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handlePriceChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRanges: prev.priceRanges.some(r => r.label === range.label)
        ? prev.priceRanges.filter(r => r.label !== range.label)
        : [...prev.priceRanges, range]
    }));
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Filter by languages
    if (filters.languages.length > 0) {
      filtered = filtered.filter(product => 
        filters.languages.includes(product.language)
      );
    }

    // Filter by price ranges
    if (filters.priceRanges.length > 0) {
      filtered = filtered.filter(product => 
        filters.priceRanges.some(range => 
          product.price >= range.min && product.price <= range.max
        )
      );
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return <div className="loading-state">Loading products...</div>;
  }

  return (
    <div className="shop-page">
      <div className="shop-container">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <FiFilter className="filter-icon-header" />
          </div>

          {/* Categories Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Categories</h3>
            {categories.map((category) => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          {/* Language Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Language</h3>
            {languages.map((language) => (
              <label key={language} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.languages.includes(language)}
                  onChange={() => handleLanguageChange(language)}
                />
                <span>{language}</span>
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-section">
            <h3 className="filter-title">Price</h3>
            {priceRanges.map((range) => (
              <label key={range.label} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.priceRanges.some(r => r.label === range.label)}
                  onChange={() => handlePriceChange(range)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Products Section */}
        <main className="products-section">
          <div className="products-header">
            <h2 className="products-count">{filteredProducts.length} products</h2>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>No products found matching your filters</p>
            </div>
          ) : (
            <div className="products-grid-shop">
              {filteredProducts.map((product) => (
                <div 
                  key={product._id} 
                  className="shop-product-card"
                  onClick={() => navigate(`/shop/${product._id}`)}
                >
                  <div className="shop-product-image">
                    <img 
                      src={`http://localhost:5001${product.image}`} 
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  </div>
                  <div className="shop-product-info">
                    <h3 className="shop-product-title">{product.title}</h3>
                    <p className="shop-product-price">${product.price}</p>
                    <span className="shop-product-category">{product.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;