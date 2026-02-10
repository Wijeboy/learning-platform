import React from 'react';
import './ShopPage.css';

const ShopPage = () => {
  const courses = [
    { id: 1, title: "Complete Web Development Bootcamp", instructor: "Jason bell", price: "$19.99", rating: "5.0", img: "https://imgs.search.brave.com/Hb5czKZ7_dbPT6kRuL7JdnLJT0qHIqYSamL2dcJRfVc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9mbGF0/aXJvbnNjaG9vbC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjEvMTIvU29mdHdh/cmVfRW5naW5lZXJp/bmdfTGVhcm5fdG9f/Q29kZV9pbl9XZWJf/RGV2ZWxvcG1lbnRf/Qm9vdGNhbXBfQ292/ZXItNzY4eDM0Mi5q/cGc" },
    { id: 2, title: "Front-End Developer Professional Certificate", instructor: "Jason bell", price: "$12.00", rating: "5.0", img: "https://imgs.search.brave.com/gGir6M7jfwPEtNO0JhY8XNukt0HV1r2P1nJOnCXefPI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGVzaWdudmVsb3Bl/ci5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDYvQmVj/b21lLWEtRnJvbnQt/RW5kLVdlYi1EZXZl/bG9wZXItTGlua2Vk/SW4tMTAyNHg1ODUu/d2VicA" },
    { id: 3, title: "The Odin Project", instructor: "Jason bell", price: "$28.03", rating: "5.0", img: "https://imgs.search.brave.com/lHWPTEnXcNsGBOzLlrq58Ak_gJ_LjNmzgdSmWcEQW4c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb2Rl/YnlibGF6ZWouY29t/L2Fzc2V0cy9pbWcv/ZmluaXNoZWQlMjBy/dWJ5L0dSQVBIJTIw/VFRZLnBuZw" },
    { id: 4, title: "Responsive Web Design Certification", instructor: "Jason bell", price: "Free", rating: "5.0", img: "https://imgs.search.brave.com/Uhhh93vS9uMGPiY6ZZpikXKBY9DinGRAYwVFYVhmSMo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/aGFzaG5vZGUuY29t/L3Jlcy9oYXNobm9k/ZS9pbWFnZS91cGxv/YWQvdjE3NjM3NjAx/MjMwODAvNzQ5NjA0/YmYtMzYyMC00MGFk/LWJkNWYtNDg4YmQ4/ZmFhMjUxLnBuZw" },
    { id: 5, title: "Web Programming with Python and JavaScript", instructor: "Jason bell", price: "$14.02", rating: "5.0", img: "https://imgs.search.brave.com/5u4eDTYlnPqg4wLuhsX_vVJLmzhNupjo3RSUnvv7tWM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMtbmEuc3NsLWlt/YWdlcy1hbWF6b24u/Y29tL2ltYWdlcy9J/LzYxMnhpblM4LTNM/LmpwZw" },
    { id: 6, title: "Full Stack Open", instructor: "Jason bell", price: "$34.40", rating: "5.0", img: "https://imgs.search.brave.com/sOWVzdPQrzy2H0exmMMYqYWcOnCdEYan0aCG1QEhZl0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1p/bGx1c3RyYXRpb24v/ZnVsbC1zdGFjay1k/ZXZlbG9wbWVudC1j/b25jZXB0LWNlbGwt/MjYwbnctMTk3ODIy/NTIwOC5qcGc" },
  ];

  return (
    <div className="shop-page">
      {/* Header Section */}
      <header className="shop-header">
        <div className="container">
          <h1>Shop Page</h1>
          <p>Home /<span>Shop Page</span></p>
        </div>
      </header>

      <div className="container shop-layout">
        {/* Left Sidebar Filters */}
        <aside className="filter-sidebar">
          <div className="sidebar-header">
            <h2>Filters</h2>
            <button className="clear-filters">Clear All</button>
          </div>

          <div className="filter-group">
            <h3>Categories</h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Art & Design</span>
                  <span className="filter-count">(8)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Business</span>
                  <span className="filter-count">(12)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Information Technology</span>
                  <span className="filter-count">(7)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Development</span>
                  <span className="filter-count">(10)</span>
                </label>
              </li>
            </ul>
            <button className="show-more">Show More +</button>
          </div>

          <div className="filter-group">
            <h3>Language</h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">English</span>
                  <span className="filter-count">(53)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Sinhala</span>
                  <span className="filter-count">(11)</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Tamil</span>
                  <span className="filter-count">(22)</span>
                </label>
              </li>
            </ul>
          </div>

          <div className="filter-group">
            <h3>Price</h3>
            <ul>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">All Price</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Free</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" />
                  <span className="filter-label">Paid</span>
                </label>
              </li>
            </ul>
          </div>
        </aside>

        {/* Right Course Grid */}
        <main className="course-main">
          <div className="course-toolbar">
            <p>Showing 1-9 of 6 Results</p>
            <select className="sort-dropdown">
              <option>Default Sorting</option>
            </select>
          </div>

          <div className="shop-grid">
            {courses.map(course => (
              <div key={course.id} className="shop-card">
                <div className="card-image">
                  <img src={course.img} alt={course.title} />
                  <span className="category-tag">Development</span>
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