import React, { useState, useMemo } from 'react';
import './Instructors.css';

const Instructors = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [instructorsList, setInstructorsList] = useState([
    { 
      id: 1,
      name: "Zrand Hobs", 
      role: "Developer", 
      rating: 4.8, 
      reviews: 6, 
      tags: ["Gimp", "Wordpress"],
      image: "https://i.pravatar.cc/150?img=12",
      email: "zrand.hobs@example.com",
      phone: "+1 234 567 8901",
      bio: "Experienced developer with 8+ years in web development. Specialized in creating dynamic and responsive websites using modern frameworks.",
      experience: "8 years",
      students: 234,
      courses: 12,
      location: "San Francisco, CA",
      languages: ["English", "Spanish"],
      education: "BS Computer Science, Stanford University",
      certifications: ["AWS Certified Developer", "Google Cloud Professional"],
      socialLinks: {
        linkedin: "linkedin.com/in/zrandhobs",
        twitter: "@zrandhobs",
        github: "github.com/zrandhobs"
      }
    },
    { 
      id: 2,
      name: "Dorothy Wood", 
      role: "UI Designer", 
      rating: 4.8, 
      reviews: 6, 
      tags: ["Elementor", "Wix", "Illustrator"],
      image: "https://i.pravatar.cc/150?img=5",
      email: "dorothy.wood@example.com",
      phone: "+1 234 567 8902",
      bio: "Creative UI designer passionate about crafting beautiful and intuitive user interfaces. Expert in design systems and user experience.",
      experience: "6 years",
      students: 189,
      courses: 9,
      location: "New York, NY",
      languages: ["English", "French"],
      education: "BFA Graphic Design, Parsons School of Design",
      certifications: ["Adobe Certified Expert", "UX Design Professional"],
      socialLinks: {
        linkedin: "linkedin.com/in/dorothywood",
        twitter: "@dorothywood",
        dribbble: "dribbble.com/dorothywood"
      }
    },
    { 
      id: 3,
      name: "Timothy Baker", 
      role: "Designer", 
      rating: 4.8, 
      reviews: 5, 
      tags: ["Figma", "Elementor", "Wordpress"],
      image: "https://i.pravatar.cc/150?img=33",
      email: "timothy.baker@example.com",
      phone: "+1 234 567 8903",
      bio: "Full-stack designer with expertise in both UI/UX and web development. Love bringing ideas to life through elegant design solutions.",
      experience: "5 years",
      students: 156,
      courses: 8,
      location: "Austin, TX",
      languages: ["English"],
      education: "BA Design, University of Texas",
      certifications: ["Figma Professional", "WordPress Developer"],
      socialLinks: {
        linkedin: "linkedin.com/in/timothybaker",
        behance: "behance.net/timothybaker"
      }
    },
    { 
      id: 4,
      name: "Shane Pratt", 
      role: "Marketing", 
      rating: 4.8, 
      reviews: 6, 
      tags: ["Figma", "Wordpress", "Gimp"],
      image: "https://i.pravatar.cc/150?img=14",
      email: "shane.pratt@example.com",
      phone: "+1 234 567 8904",
      bio: "Digital marketing strategist with a focus on content creation and brand development. Helping businesses grow their online presence.",
      experience: "7 years",
      students: 312,
      courses: 15,
      location: "Chicago, IL",
      languages: ["English", "German"],
      education: "MBA Marketing, Northwestern University",
      certifications: ["Google Ads Certified", "HubSpot Marketing"],
      socialLinks: {
        linkedin: "linkedin.com/in/shanepratt",
        twitter: "@shanepratt"
      }
    },
    { 
      id: 5,
      name: "Frances Washing", 
      role: "UI Designer", 
      rating: 4.9, 
      reviews: 8, 
      tags: ["Wordpress", "Wix", "Illustrator"],
      image: "https://i.pravatar.cc/150?img=9",
      email: "frances.washing@example.com",
      phone: "+1 234 567 8905",
      bio: "Award-winning UI designer focused on creating accessible and inclusive digital experiences. Mentor and design advocate.",
      experience: "9 years",
      students: 278,
      courses: 11,
      location: "Seattle, WA",
      languages: ["English", "Japanese"],
      education: "MFA Design, Rhode Island School of Design",
      certifications: ["Adobe Master", "Accessibility Specialist"],
      socialLinks: {
        linkedin: "linkedin.com/in/franceswashing",
        dribbble: "dribbble.com/franceswashing"
      }
    },
    { 
      id: 6,
      name: "Jason Bell", 
      role: "Developer", 
      rating: 4.7, 
      reviews: 4, 
      tags: ["Elementor", "Wordpress"],
      image: "https://i.pravatar.cc/150?img=15",
      email: "jason.bell@example.com",
      phone: "+1 234 567 8906",
      bio: "Backend developer specializing in scalable web applications. Passionate about clean code and modern development practices.",
      experience: "6 years",
      students: 145,
      courses: 7,
      location: "Boston, MA",
      languages: ["English"],
      education: "BS Software Engineering, MIT",
      certifications: ["MongoDB Certified", "Node.js Professional"],
      socialLinks: {
        linkedin: "linkedin.com/in/jasonbell",
        github: "github.com/jasonbell"
      }
    },
    { 
      id: 7,
      name: "Kathryn Sanchez", 
      role: "Project Manager", 
      rating: 4.9, 
      reviews: 7, 
      tags: ["Frame", "WebFlow", "Wix"],
      image: "https://i.pravatar.cc/150?img=47",
      email: "kathryn.sanchez@example.com",
      phone: "+1 234 567 8907",
      bio: "Certified project manager with expertise in agile methodologies. Successfully delivered 100+ projects on time and within budget.",
      experience: "10 years",
      students: 423,
      courses: 18,
      location: "Los Angeles, CA",
      languages: ["English", "Spanish", "Portuguese"],
      education: "MBA Project Management, UCLA",
      certifications: ["PMP Certified", "Scrum Master", "Six Sigma"],
      socialLinks: {
        linkedin: "linkedin.com/in/kathrynsanchez",
        twitter: "@kathrynsanchez"
      }
    },
    { 
      id: 8,
      name: "Jaime Strickland", 
      role: "Accountant", 
      rating: 4.6, 
      reviews: 5, 
      tags: ["Gimp", "Figma", "WebFlow"],
      image: "https://i.pravatar.cc/150?img=13",
      email: "jaime.strickland@example.com",
      phone: "+1 234 567 8908",
      bio: "Financial expert helping businesses streamline their accounting processes. Specializing in digital tools and automation.",
      experience: "12 years",
      students: 267,
      courses: 10,
      location: "Miami, FL",
      languages: ["English", "Spanish"],
      education: "CPA, University of Florida",
      certifications: ["CPA", "QuickBooks ProAdvisor", "Tax Specialist"],
      socialLinks: {
        linkedin: "linkedin.com/in/jaimestrickland"
      }
    },
  ]);

  const [newInstructor, setNewInstructor] = useState({
    name: '',
    role: 'Developer',
    rating: 5.0,
    reviews: 0,
    tags: '',
    image: '',
    email: '',
    phone: '',
    bio: '',
    experience: '',
    students: 0,
    courses: 0,
    location: '',
    languages: '',
    education: '',
    certifications: '',
    linkedin: '',
    twitter: '',
    github: '',
    dribbble: '',
    behance: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    { id: 'all', label: 'All',  },
    { id: 'developer', label: 'Developer',  },
    { id: 'ui-designer', label: 'UI Designer',  },
    { id: 'project-manager', label: 'Project Manager',  },
    { id: 'designer', label: 'Designer', icon: '✏️' },
    { id: 'accountant', label: 'Accountant', icon: '💰' },
    { id: 'human-resource', label: 'Human Resource', },
    { id: 'marketing', label: 'Marketing', }
  ];

  // Filter instructors based on active category and search
  const filteredInstructors = useMemo(() => {
    return instructorsList.filter(instructor => {
      const matchesCategory = activeCategory === 'All' || 
        instructor.role.toLowerCase() === activeCategory.toLowerCase().replace('-', ' ');
      
      const matchesSearch = searchQuery === '' ||
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, instructorsList]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleViewAll = () => {
    console.log('View all instructors');
  };

  const handleInstructorClick = (instructor) => {
    setSelectedInstructor(instructor);
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
    setSelectedInstructor(null);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setImagePreview('');
    // Reset form
    setNewInstructor({
      name: '',
      role: 'Developer',
      rating: 5.0,
      reviews: 0,
      tags: '',
      image: '',
      email: '',
      phone: '',
      bio: '',
      experience: '',
      students: 0,
      courses: 0,
      location: '',
      languages: '',
      education: '',
      certifications: '',
      linkedin: '',
      twitter: '',
      github: '',
      dribbble: '',
      behance: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstructor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewInstructor(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewInstructor = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newInstructor.name.trim()) {
      alert('Please enter instructor name');
      return;
    }

    if (!newInstructor.email.trim()) {
      alert('Please enter instructor email');
      return;
    }

    // Create social links object
    const socialLinks = {};
    if (newInstructor.linkedin) socialLinks.linkedin = newInstructor.linkedin;
    if (newInstructor.twitter) socialLinks.twitter = newInstructor.twitter;
    if (newInstructor.github) socialLinks.github = newInstructor.github;
    if (newInstructor.dribbble) socialLinks.dribbble = newInstructor.dribbble;
    if (newInstructor.behance) socialLinks.behance = newInstructor.behance;

    // Create new instructor object
    const instructor = {
      id: instructorsList.length + 1,
      name: newInstructor.name.trim(),
      role: newInstructor.role,
      rating: parseFloat(newInstructor.rating),
      reviews: parseInt(newInstructor.reviews),
      tags: newInstructor.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      image: newInstructor.image || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      email: newInstructor.email.trim(),
      phone: newInstructor.phone.trim() || 'Not provided',
      bio: newInstructor.bio.trim() || 'No bio provided yet.',
      experience: newInstructor.experience.trim() || 'Not specified',
      students: parseInt(newInstructor.students) || 0,
      courses: parseInt(newInstructor.courses) || 0,
      location: newInstructor.location.trim() || 'Not specified',
      languages: newInstructor.languages.split(',').map(lang => lang.trim()).filter(lang => lang),
      education: newInstructor.education.trim() || 'Not specified',
      certifications: newInstructor.certifications.split(',').map(cert => cert.trim()).filter(cert => cert),
      socialLinks: socialLinks
    };

    // Add to list
    setInstructorsList(prev => [...prev, instructor]);
    
    // Show success message
    alert(`✅ Instructor "${instructor.name}" added successfully!`);
    
    // Close modal
    handleCloseAddModal();
  };

  return (
    <div className="instructors-page">
      {/* Decorative Background Elements */}
      <div className="deco-planet deco-planet-1"></div>
      <div className="deco-star deco-star-1"></div>
      <div className="deco-pencil"></div>
      <div className="deco-wave"></div>

      {/* Title Banner */}
      <header className="page-header-banner">
        <div className="header-content">
          <div className="header-top">
            <div>
              <h1 className="page-title">All Instructors</h1>
              <div className="breadcrumb">
                <span className="breadcrumb-link">Home</span>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">Instructors</span>
              </div>
            </div>
            <button onClick={handleOpenAddModal} className="add-instructor-btn">
              <span className="add-icon">+</span>
              <span>Add New Instructor</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <p className="subtitle">
          Find the best mentor for your company and boosts<br />
          your business 10x!
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.label)}
              className={`cat-tab ${activeCategory === cat.label ? 'active' : ''}`}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="results-count">
            Found {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Total Count */}
        <p className="total-count">
          Showing {filteredInstructors.length} of {instructorsList.length} instructors
        </p>

        {/* Instructor Cards Grid */}
        <div className="instructor-grid">
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map((person, index) => (
              <div
                key={person.id}
                className="instructor-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="profile-img-container">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="profile-img" 
                  />
                  <div className="online-status"></div>
                </div>
                
                <div className="rating">
                  <span className="star-icon">⭐</span>
                  <span className="rating-value">{person.rating}</span>
                  <span className="review-count">({person.reviews})</span>
                </div>
                
                <h3 className="instructor-name">{person.name}</h3>
                <p className="role">{person.role}</p>
                
                <div className="tags">
                  {person.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <button 
                  className="profile-btn"
                  onClick={() => handleInstructorClick(person)}
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No instructors found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {filteredInstructors.length > 0 && (
          <button onClick={handleViewAll} className="view-all-btn">
            <span>View All Instructors</span>
            <span className="arrow-icon">→</span>
          </button>
        )}
      </div>

      {/* Add Instructor Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={handleCloseAddModal}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Instructor</h2>
              <button className="close-btn" onClick={handleCloseAddModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmitNewInstructor} className="instructor-form">
              {/* Image Upload Section */}
              <div className="image-upload-section">
                <div className="image-preview-container">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <span className="upload-icon">📸</span>
                      <p>Upload Photo</p>
                    </div>
                  )}
                </div>
                <div className="upload-controls">
                  <label htmlFor="image-upload" className="upload-btn">
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <small>Max size: 5MB (JPG, PNG, GIF)</small>
                </div>
              </div>

              <div className="form-divider">
                <span>Basic Information</span>
              </div>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newInstructor.name}
                  onChange={handleInputChange}
                  placeholder="Enter instructor name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newInstructor.email}
                    onChange={handleInputChange}
                    placeholder="instructor@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={newInstructor.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <select
                    id="role"
                    name="role"
                    value={newInstructor.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Developer">Developer</option>
                    <option value="UI Designer">UI Designer</option>
                    <option value="Designer">Designer</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newInstructor.location}
                    onChange={handleInputChange}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={newInstructor.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-divider">
                <span>Professional Details</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="experience">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={newInstructor.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="education">Education</label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={newInstructor.education}
                    onChange={handleInputChange}
                    placeholder="Degree, University"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="students">Total Students</label>
                  <input
                    type="number"
                    id="students"
                    name="students"
                    value={newInstructor.students}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courses">Total Courses</label>
                  <input
                    type="number"
                    id="courses"
                    name="courses"
                    value={newInstructor.courses}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rating">Rating (0-5)</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={newInstructor.rating}
                    onChange={handleInputChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reviews">Reviews Count</label>
                  <input
                    type="number"
                    id="reviews"
                    name="reviews"
                    value={newInstructor.reviews}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Skills/Tags (comma separated)</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={newInstructor.tags}
                  onChange={handleInputChange}
                  placeholder="e.g. React, JavaScript, CSS"
                />
                <small>Separate multiple skills with commas</small>
              </div>

              <div className="form-group">
                <label htmlFor="languages">Languages (comma separated)</label>
                <input
                  type="text"
                  id="languages"
                  name="languages"
                  value={newInstructor.languages}
                  onChange={handleInputChange}
                  placeholder="e.g. English, Spanish"
                />
              </div>

              <div className="form-group">
                <label htmlFor="certifications">Certifications (comma separated)</label>
                <input
                  type="text"
                  id="certifications"
                  name="certifications"
                  value={newInstructor.certifications}
                  onChange={handleInputChange}
                  placeholder="e.g. AWS Certified, PMP"
                />
              </div>

              <div className="form-divider">
                <span>Social Links</span>
              </div>

              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={newInstructor.linkedin}
                  onChange={handleInputChange}
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="twitter">Twitter</label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={newInstructor.twitter}
                    onChange={handleInputChange}
                    placeholder="@username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="github">GitHub</label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={newInstructor.github}
                    onChange={handleInputChange}
                    placeholder="github.com/username"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dribbble">Dribbble</label>
                  <input
                    type="text"
                    id="dribbble"
                    name="dribbble"
                    value={newInstructor.dribbble}
                    onChange={handleInputChange}
                    placeholder="dribbble.com/username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="behance">Behance</label>
                  <input
                    type="text"
                    id="behance"
                    name="behance"
                    value={newInstructor.behance}
                    onChange={handleInputChange}
                    placeholder="behance.net/username"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseAddModal} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <span>Add Instructor</span>
                  <span className="submit-icon">✓</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Details Modal */}
      {showProfileModal && selectedInstructor && (
        <div className="modal-overlay" onClick={handleCloseProfileModal}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Instructor Profile</h2>
              <button className="close-btn" onClick={handleCloseProfileModal}>×</button>
            </div>
            
            <div className="profile-content">
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-image-large">
                  <img src={selectedInstructor.image} alt={selectedInstructor.name} />
                  <div className="online-badge">
                    <span className="online-dot"></span>
                    Online
                  </div>
                </div>
                <div className="profile-header-info">
                  <h2>{selectedInstructor.name}</h2>
                  <p className="profile-role">{selectedInstructor.role}</p>
                  <div className="profile-rating">
                    <span className="star-icon">⭐</span>
                    <span className="rating-value">{selectedInstructor.rating}</span>
                    <span className="review-count">({selectedInstructor.reviews} reviews)</span>
                  </div>
                  <div className="profile-location">
                    <span className="location-icon">📍</span>
                    {selectedInstructor.location}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="profile-stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{selectedInstructor.students}</div>
                  <div className="stat-label">Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{selectedInstructor.courses}</div>
                  <div className="stat-label">Courses</div>
                </div>
                <div className="stat-card">
              
                  <div className="stat-number">{selectedInstructor.experience}</div>
                  <div className="stat-label">Experience</div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="profile-section">
                <h3 className="section-title">About</h3>
                <p className="bio-text">{selectedInstructor.bio}</p>
              </div>

              {/* Skills Tags */}
              <div className="profile-section">
                <h3 className="section-title">Skills & Expertise</h3>
                <div className="skills-grid">
                  {selectedInstructor.tags.map((tag, i) => (
                    <span key={i} className="skill-badge">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="profile-section">
                <h3 className="section-title">Contact Information</h3>
                <div className="contact-grid">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">{selectedInstructor.email}</div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📱</span>
                    <div>
                      <div className="contact-label">Phone</div>
                      <div className="contact-value">{selectedInstructor.phone}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="profile-section">
                <h3 className="section-title">Education</h3>
                <div className="education-item">
                  <span className="education-icon">🎓</span>
                  <p>{selectedInstructor.education}</p>
                </div>
              </div>

              {selectedInstructor.certifications && selectedInstructor.certifications.length > 0 && (
                <div className="profile-section">
                  <h3 className="section-title">Certifications</h3>
                  <div className="certifications-list">
                    {selectedInstructor.certifications.map((cert, i) => (
                      <div key={i} className="certification-item">
                        <span className="cert-icon">✓</span>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {selectedInstructor.languages && selectedInstructor.languages.length > 0 && (
                <div className="profile-section">
                  <h3 className="section-title">Languages</h3>
                  <div className="languages-list">
                    {selectedInstructor.languages.map((lang, i) => (
                      <span key={i} className="language-badge">{lang}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              {selectedInstructor.socialLinks && Object.keys(selectedInstructor.socialLinks).length > 0 && (
                <div className="profile-section">
                  <h3 className="section-title">Connect</h3>
                  <div className="social-links-grid">
                    {selectedInstructor.socialLinks.linkedin && (
                      <a href={`https://${selectedInstructor.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link-btn linkedin">
                        <span>in</span> LinkedIn
                      </a>
                    )}
                    {selectedInstructor.socialLinks.twitter && (
                      <a href={`https://twitter.com/${selectedInstructor.socialLinks.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link-btn twitter">
                        <span>𝕏</span> Twitter
                      </a>
                    )}
                    {selectedInstructor.socialLinks.github && (
                      <a href={`https://${selectedInstructor.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="social-link-btn github">
                        <span>⚡</span> GitHub
                      </a>
                    )}
                    
                    {selectedInstructor.socialLinks.behance && (
                      <a href={`https://${selectedInstructor.socialLinks.behance}`} target="_blank" rel="noopener noreferrer" className="social-link-btn behance">
                        <span>Be</span> Behance
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="profile-actions">
                <button className="action-btn primary-action">
                   Send Message
                </button>
                <button className="action-btn secondary-action">
                   Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructors;