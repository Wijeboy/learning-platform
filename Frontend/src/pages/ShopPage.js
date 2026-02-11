import React, { useState } from 'react';
import './ShopPage.css';

const ShopPage = () => {
  // 1. Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  const courses = [
    { id: 1, title: "Complete Web Development Bootcamp", instructor: "Jason bell", price: "$19.99", rating: "5.0", category: "Development", language: "English", img: "https://imgs.search.brave.com/c6LXWdPlr06NHRHd19ro988T5lgQVR0X5sr4z7BH3Rk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC90ZnZrdXVq/OG5hZTAvMXV0cWZx/Q2wwT3lNOEhkUkJP/ZENSVS82OTY5NjM0/MTdmNjZiYzY5MDM0/YzgwMjBmYjMzNjZl/NC9jYXJlZXItc3Vw/cG9ydC1jbGFzc3Jv/b20tbWFya2V0aW5n/LXBob3RvMy5qcGc_/dz03NDAmaD03MTEm/Zmw9cHJvZ3Jlc3Np/dmUmcT0xMDAmZm09/anBn" },
    { id: 2, title: "Front-End Developer Professional Certificate", instructor: "Jason bell", price: "$12.00", rating: "5.0", category: "Development", language: "Sinhala", img: "https://imgs.search.brave.com/TbBK2fktIig9d8wSKMno_NCnK4q5NarwyhiOvp2KpdI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bWNoZW5yeS5lZHUv/cHJvZ3JhbS1pbWFn/ZXMvZGV2ZWxvcGVy/LmpwZw" },
    { id: 3, title: "The Odin Project", instructor: "Jason bell", price: "$28.03", rating: "5.0", category: "Development", language: "English", img: "https://imgs.search.brave.com/lHWPTEnXcNsGBOzLlrq58Ak_gJ_LjNmzgdSmWcEQW4c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb2Rl/YnlibGF6ZWouY29t/L2Fzc2V0cy9pbWcv/ZmluaXNoZWQlMjBy/dWJ5L0dSQVBIJTIw/VFRZLnBuZw" },
    { id: 4, title: "Responsive Web Design Certification", instructor: "Jason bell", price: "Free", rating: "5.0", category: "Art & Design", language: "English", img: "https://imgs.search.brave.com/VBA36VYugp-v_2G3QVlPxq3P1paq12_zA4lsmGkuMlo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9lY29y/bmVsbC5jb3JuZWxs/LmVkdS93cC1jb250/ZW50L3VwbG9hZHMv/c2l0ZXMvOC8yMDIw/LzA0L1BEU183NTB4/NTAwLUJXLTM2NXgy/NDMuanBn" },
    { id: 5, title: "Web Programming with Python and JavaScript", instructor: "Jason bell", price: "$14.02", rating: "5.0", category: "Development", language: "Tamil", img: "https://imgs.search.brave.com/5u4eDTYlnPqg4wLuhsX_vVJLmzhNupjo3RSUnvv7tWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxMnhpblM4LTNM/LmpwZw" },
    { id: 6, title: "Full Stack Open", instructor: "Jason bell", price: "$34.40", rating: "5.0", category: "Information Technology", language: "English", img: "https://imgs.search.brave.com/sOWVzdPQrzy2H0exmMMYqYWcOnCdEYan0aCG1QEhZl0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1p/bGx1c3RyYXRpb24v/ZnVsbC1zdGFjay1k/ZXZlbG9wbWVudC1j/b25jZXB0LWNlbGwt/MjYwbnctMTk3ODIy/NTIwOC5qcGc" },
  ];

  // 2. Combined Filter Logic
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "All" || course.language === selectedLanguage;
    const matchesPrice = selectedPrice === "All" || 
                         (selectedPrice === "Free" ? course.price === "Free" : course.price !== "Free");
    
    return matchesCategory && matchesLanguage && matchesPrice;
  });

  return (
    <div className="shop-page">
      <header className="shop-header">
        <div className="container">
          <h1>Shop Page</h1>
          <p>Home /<span>Shop Page</span></p>
        </div>
      </header>

      <div className="container shop-layout">
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <h2>Filters</h2>
            <button className="clear-filters" onClick={() => { setSelectedCategory("All"); setSelectedLanguage("All"); setSelectedPrice("All"); }}>Clear All</button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <h3>Categories</h3>
            <ul>
              <li><label><input type="checkbox" checked={selectedCategory === "Art & Design"} onChange={() => setSelectedCategory("Art & Design")} /> Art & Design</label></li>
              <li><label><input type="checkbox" checked={selectedCategory === "Business"} onChange={() => setSelectedCategory("Business")} /> Business</label></li>
              <li><label><input type="checkbox" checked={selectedCategory === "Information Technology"} onChange={() => setSelectedCategory("Information Technology")} /> Information Tech</label></li>
              <li><label><input type="checkbox" checked={selectedCategory === "Development"} onChange={() => setSelectedCategory("Development")} /> Development</label></li>
            </ul>
          </div>

          {/* Language Filter */}
          <div className="filter-group">
            <h3>Language</h3>
            <ul>
              <li><label><input type="checkbox" checked={selectedLanguage === "English"} onChange={() => setSelectedLanguage("English")} /> English</label></li>
              <li><label><input type="checkbox" checked={selectedLanguage === "Sinhala"} onChange={() => setSelectedLanguage("Sinhala")} /> Sinhala</label></li>
              <li><label><input type="checkbox" checked={selectedLanguage === "Tamil"} onChange={() => setSelectedLanguage("Tamil")} /> Tamil</label></li>
            </ul>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h3>Price</h3>
            <ul>
              <li><label><input type="checkbox" checked={selectedPrice === "All"} onChange={() => setSelectedPrice("All")} /> All Price</label></li>
              <li><label><input type="checkbox" checked={selectedPrice === "Free"} onChange={() => setSelectedPrice("Free")} /> Free</label></li>
              <li><label><input type="checkbox" checked={selectedPrice === "Paid"} onChange={() => setSelectedPrice("Paid")} /> Paid</label></li>
            </ul>
          </div>
        </aside>

        <main className="course-main">
          <div className="course-toolbar">
            <p>Showing {filteredCourses.length} Results</p>
            <select className="sort-dropdown">
              <option>Default Sorting</option>
            </select>
          </div>

          <div className="shop-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="shop-card">
                <div className="card-image">
                  <img src={course.img} alt={course.title} />
                  <span className="category-tag">{course.category}</span>
                </div>
                <div className="card-content">
                  <h4>{course.title}</h4>
                  <p className="instructor">{course.instructor}</p>
                  <div className="rating">⭐⭐⭐⭐⭐ <span>({course.rating})</span></div>
                  <div className="card-footer">
                    <span className="price">{course.price}</span>
                    <button className="enroll-btn">Enroll Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopPage;