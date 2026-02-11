import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-8 left-16 opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-purple-300">
          <ellipse cx="30" cy="25" rx="20" ry="3" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>
      
      <div className="absolute top-12 right-32 opacity-30">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="text-purple-300">
          <path d="M10,40 Q40,10 70,40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M5,45 Q40,15 75,45 Q40,75 5,45" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      <div className="absolute top-32 right-16 opacity-30">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" className="text-purple-300">
          <path d="M15,15 L35,15 L42,25 L35,35 L15,35 L8,25 Z" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="absolute top-20 right-96">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-purple-300 opacity-40">
          <polygon points="20,5 25,15 35,15 27,22 30,32 20,26 10,32 13,22 5,15 15,15" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </div>

      <div className="absolute top-24 right-64 opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-purple-300">
          <path d="M10,50 L30,10 L50,50" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      </div>

      {/* Header Section */}
      <div className="relative pt-24 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Contact With Us
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="hover:text-purple-600 cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-purple-600">Contact</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-black py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info Cards */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Awamilleaug Drive, Kensington<br />
                    London, UK
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">
                    +1 (800) 123 456 789<br />
                    +1 (800) 123 456 789
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">E-mail Address</h3>
                  <p className="text-gray-600">
                    info@gmail.com<br />
                    info@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-10 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us Message</h2>
            <p className="text-gray-600 mb-8">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none"
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  className="px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail *"
                  className="px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  required
                />
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website *"
                  className="px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-300 to-teal-400 text-gray-900 font-semibold rounded-full hover:from-teal-400 hover:to-teal-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 transform"
              >
                Submit Now
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto mt-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946229!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2slk!4v1638000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;