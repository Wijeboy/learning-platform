import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShopPage.css';

const ShopPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter Toggle Logic
  const handleCategoryChange = (category) => {
    setSelectedCategory(prev => prev === category ? "All" : category);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(prev => prev === lang ? "All" : lang);
  };

  // Filtering Logic
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "All" || course.language === selectedLanguage;
    const matchesPrice = selectedPrice === "All" || 
                         (selectedPrice === "Free" ? course.price === "Free" : course.price !== "Free");
    
    return matchesCategory && matchesLanguage && matchesPrice;
  });

  if (loading) {
    return <div className="loading-container">Loading courses...</div>;
  }

  return (
    <div className="shop-page">
      <header className="shop-header">
        <div className="container">
          <h1>Explore Courses</h1>
          <p>Home / <span>Shop Page</span></p>
        </div>
      </header>

      <div className="container shop-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <h2>Filters</h2>
            <button className="clear-filters" onClick={() => { setSelectedCategory("All"); setSelectedLanguage("All"); setSelectedPrice("All"); }}>
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h3>Categories</h3>
            <ul>
              {["Art & Design", "Business", "Information Technology", "Development"].map(cat => (
                <li key={cat}>
                  <label className={selectedCategory === cat ? "active-filter" : ""}>
                    <input 
                      type="checkbox" 
                      checked={selectedCategory === cat} 
                      onChange={() => handleCategoryChange(cat)} 
                    /> {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Language Filter */}
          <div className="filter-group">
            <h3>Language</h3>
            <ul>
              {["English", "Sinhala", "Tamil"].map(lang => (
                <li key={lang}>
                  <label className={selectedLanguage === lang ? "active-filter" : ""}>
                    <input 
                      type="checkbox" 
                      checked={selectedLanguage === lang} 
                      onChange={() => handleLanguageChange(lang)} 
                    /> {lang}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h3>Price</h3>
            <ul>
              {["All", "Free", "Paid"].map(p => (
                <li key={p}>
                  <label className={selectedPrice === p ? "active-filter" : ""}>
                    <input 
                      type="checkbox" 
                      checked={selectedPrice === p} 
                      onChange={() => setSelectedPrice(p)} 
                    /> {p === "All" ? "All Price" : p}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="course-main">
          <div className="course-toolbar">
            <p>Showing <b>{filteredCourses.length}</b> Results</p>
            <div className="current-filter-tags">
                {selectedCategory !== "All" && <span className="tag">{selectedCategory}</span>}
                {selectedLanguage !== "All" && <span className="tag">{selectedLanguage}</span>}
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="shop-grid">
              {filteredCourses.map(course => (
                <div key={course._id} className="shop-card">
                  <div className="card-image">
                    <img src={course.image} alt={course.name} />
                    <span className="category-tag">{course.category}</span>
                  </div>
                  <div className="card-content">
                    <h4>{course.name}</h4>
                    <p className="instructor">{course.instructor || "Expert Instructor"}</p>
                    <div className="rating">⭐⭐⭐⭐⭐ <span>({course.rating || "4.5"})</span></div>
                    <div className="card-footer">
                      <span className="price">{course.price}</span>
                      <button 
                        className="enroll-btn"
                        onClick={() => window.location.href=`/details/${course._id}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No courses found for the selected filters.</h3>
              <button onClick={() => setSelectedCategory("All")}>Reset Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;