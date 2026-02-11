import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-container">
       {/* Header Section */}
      <header className="shop-header">
        <div className="container">
          <h1>Contact Page</h1>
          <p>Home /<span>Contact</span></p>
        </div>
      </header>
      
      {/* Main Content */}
      <section className="contact-content">
        {/* Contact Information */}
        <div className="info-sidebar">
          <div className="info-card">
            <div className="icon-box address-icon">📍</div>
            <div className="info-text">
              <h4>Address</h4>
              <p>123, Reed Avenue<br/>Colombo 06</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box phone-icon">📞</div>
            <div className="info-text">
              <h4>Phone</h4>
              <p>011-2234987<br/>011-2234986</p>
            </div>
          </div>

          <div className="info-card">
            <div className="icon-box email-icon">📧</div>
            <div className="info-text">
              <h4>E-mail Address</h4>
              <p>support@LearnX.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="form-card">
          <h2>Send Us Message</h2>
          <p>Your email address will not be published. Required fields are marked *</p>
          
          <form>
            <textarea placeholder="Message" rows="5"></textarea>
            <div className="input-group">
              <input type="text" placeholder="Name *" required />
              <input type="email" placeholder="E-mail *" required />
              <input type="text" placeholder="Website *" />
            </div>
            <button type="submit" className="submit-btn">
              Submit Now
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.119763739446!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy"
          title="Map"
        ></iframe>
      </section>
    </div>
  );
};

export default ContactPage;