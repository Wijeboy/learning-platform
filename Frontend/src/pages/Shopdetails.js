

import React from 'react';

import './Shopdetails.css';
const CoursePage = () => {
  const relatedCourses = [
    { id: 1, title: "UX/UI Engineering", price: "$39.00", rating: "5.00", color: "#f3f0ff",image : "https://imgs.search.brave.com/bIByLs92rewnszu7YKGlC2uSFGO4FZYBTxj3vlA1NCk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTAw/NzA5NzYyNC92ZWN0/b3IvdXgtZGVzaWdu/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1FdFgwQzQ5LWNG/TWxRaXViY0laYlF0/ck1zanVldE9wcnpG/QWthbnoxUS04PQ" },
    { id: 2, title: "Backend Systems", price: "$19.00", oldPrice: "$32.00", rating: "4.50", color: "#e0f2fe" ,image :"https://imgs.search.brave.com/0nJ12OChIflN41U1xMztOZc32wMhzx5evRAnhXgS7i0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jbGFy/dXN3YXkuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzA2/L2JhY2tlbmQtZGV2/ZWxvcGVyLXRlY2hu/aWNhbC1za2lsbHMt/MS5wbmc"},
    { id: 3, title: "AI Full-Stack Pro", price: "$49.00", rating: "5.00", color: "#e0f2fe",image:"https://imgs.search.brave.com/9Z3Pi4HHnyEdHWFwHjuYVYZy09DNoYtCDWOoXSZdYWs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzExLzc2LzcxLzc5/LzM2MF9GXzExNzY3/MTc5NDNfaEl5dXJU/M1k4VTFaWlZ5T1ln/MEVIcFVEUDFrZFBs/R2IuanBn"},
    { id: 4, title: "Mobile Web Apps", price: "$49.00", oldPrice: "$69.00", rating: "4.80", color: "#e0f2fe" , image : "https://imgs.search.brave.com/cWs9pguRv2ryNrTIG3HgOJHtBvyLr6szvRCx6L8w_RA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/bW9iaWxlLWFwcC1k/ZXZlbG9wbWVudC1j/b25jZXB0LW1vZGVy/bi10ZWNobm9sb2d5/LXNtYXJ0cGhvbmUt/aW50ZXJmYWNlLWRl/c2lnbi1hcHBsaWNh/dGlvbi1idWlsZGlu/Zy1wcm9ncmFtbWlu/Zy12ZWN0b3ItZmxh/dC1pbGx1c3RyYXRp/b25fNjEzMjg0LTI1/NzEuanBnP3NlbXQ9/YWlzX2luY29taW5n/Jnc9NzQwJnE9ODA"},
  ];

  return (
    <div className="contact-container">
       {/* Header Section */}
      <header className="shop-header">
        <div className="container">
          <h1>Course Details </h1>
          <p>Home /<span>Course Details</span></p>
        </div>
      </header>

      <div className="container main-layout">
        {/* 2. LEFT CONTENT */}
        <main className="content-area">
          <section className="course-intro-card">
           
            <h2 className="course-title">Advanced Diploma Course in Full-Stack Web Development</h2>
            <div>
             <span className="rating-badge">★ 4.9 (6,420 ratings)</span><br />
             </div>
            <p className="course-desc">
              Master the art of building scalable, high-performance web applications. From front-end architecture 
              and responsive design to back-end logic, database management, and cloud deployment.
            </p>
          </section>

          <section className="learning-goals">
            <h3>What you'll learn</h3>
            <ul className="goals-list">
              <li>Architectural Mastery: Build complex, responsive user interfaces using React and Next.js.</li>
              <li>Back-End Engineering: Design and implement robust Server-Side logic using Node.js and Express.</li>
              <li>Database & Security: Master SQL and NoSQL database design and industry-standard JWT authentication.</li>
              <li>DevOps & Deployment: Deploy applications using Docker, CI/CD pipelines, and cloud services.</li>
            </ul>
          </section>
        </main>

        {/* 3. RIGHT SIDEBAR (Sticky) */}
        <aside className="sidebar">
          <div className="purchase-card">
            <div className="video-preview">
               <img src="https://imgs.search.brave.com/88ukFYs8wC-B0UzMFlJIWpl2kwhcQ1XQzRmxL1hGY_8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIz/Mjg0MzUyMy9waG90/by91aS11eC1kZXNp/Z24tYW5kLWRldmVs/b3BtZW50LWNvbmNl/cHRzLWRldmVsb3Bl/cnMtaW50ZXJhY3Qt/d2l0aC1jdXR0aW5n/LWVkZ2UtdmlydHVh/bC1zY3JlZW5zLndl/YnA_YT0xJmI9MSZz/PTYxMng2MTImdz0w/Jms9MjAmYz1vUnhj/cVE2SzI2U3JmdWVB/LXpneXhoazI4eVdD/LU1sbmxnMUdFZ1ZC/OEZBPQ" alt="Course Preview" />
              
            </div>
            <div className="price-section">
              <span className="current-price">$74.99</span>
              <span className="discount-tag">(38% OFF!)</span>
            </div>
            <button className="btn btn-start">START COURSE</button>
            <button className="btn btn-purchase">PURCHASE COURSE</button>
            
            <div className="course-features">
              <p>THIS COURSE INCLUDES:</p>
              <ul>
                <li>🌐 LANGUAGE: ENGLISH</li>
                <li>⏱  DURATION: 48H 20M</li>
                <li>🎓  CERTIFICATE UPON COMPLETION</li>
                <li>📝  12 CODING EXERCISES</li>
                <li>📄  35 ARTICLES</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* 4. RELATED COURSES SECTION */}
      <section className="container related-section">
        <h2 className="section-title">Related <span className="yellow-bg">Courses</span></h2>
        <div className="course-grid">
          {relatedCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="card-thumb" style={{ backgroundColor: course.color }}>
                {course.tag && <span className="new-label">{course.tag}</span>}
                <div className="card-thumb" style={{ backgroundColor: course.color }}>
  {course.tag && <span className="new-label">{course.tag}</span>}
  
  {/* Update this line: Use course.image instead of the emoji */}
  <img src={course.image} alt={course.title} className="card-icon-img" />
</div>
              </div>
              <div className="card-info">
                <h4>{course.title}</h4>
                <div className="stars">★★★★★ <span>({course.rating})</span></div>
                <div className="card-price">
                  {course.price} {course.oldPrice && <span className="old-price">{course.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursePage;