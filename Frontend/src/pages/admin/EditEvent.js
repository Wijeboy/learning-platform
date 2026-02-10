import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent, updateEvent } from '../../services/eventService';
import './AddEvent.css';

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    eventFee: '',
    location: '',
    category: '',
    eventDescription: '',
    resourcePerson: '',
    eventDate: '',
    startTime: '',
    allocatedSeats: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  const categories = ['Business', 'Data science', 'Web development', 'Finance', 'Health', 'Art & Design'];

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      const event = response.data;
      
      // Format date for input field (YYYY-MM-DD)
      const formattedDate = new Date(event.eventDate).toISOString().split('T')[0];
      
      setFormData({
        title: event.title,
        eventFee: event.eventFee,
        location: event.location,
        category: event.category,
        eventDescription: event.eventDescription,
        resourcePerson: event.resourcePerson,
        eventDate: formattedDate,
        startTime: event.startTime,
        allocatedSeats: event.allocatedSeats
      });
      
      setExistingImage(event.image);
      setImagePreview(`http://localhost:5001${event.image}`);
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to fetch event details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate resourcePerson to only accept letters and spaces
    if (name === 'resourcePerson') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData({
        ...formData,
        [name]: lettersOnly
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('eventFee', formData.eventFee);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('eventDescription', formData.eventDescription);
      formDataToSend.append('resourcePerson', formData.resourcePerson);
      formDataToSend.append('eventDate', formData.eventDate);
      formDataToSend.append('startTime', formData.startTime);
      formDataToSend.append('allocatedSeats', formData.allocatedSeats);
      
      if (image) {
        formDataToSend.append('image', image);
      }

      await updateEvent(id, formDataToSend);
      alert('Event updated successfully!');
      navigate('/admin/manage-events');
    } catch (error) {
      console.error('Error updating event:', error);
      alert(error.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-event-page">
      <div className="add-event-container">
        <h1 className="add-event-title">Update Event</h1>

        <form onSubmit={handleSubmit} className="add-event-form">
          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label required">Event Image</label>
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

          {/* Event Title */}
          <div className="form-group">
            <label className="form-label required">Add Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Event Fee */}
          <div className="form-group">
            <label className="form-label required">Event Fee</label>
            <input
              type="number"
              name="eventFee"
              value={formData.eventFee}
              onChange={handleChange}
              className="form-input"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label required">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              required
            />
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

          {/* Event Description */}
          <div className="form-group">
            <label className="form-label required">Event Description</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              className="form-textarea"
              rows="5"
              required
            />
          </div>

          {/* Resource Person */}
          <div className="form-group">
            <label className="form-label required">Resource Person</label>
            <input
              type="text"
              name="resourcePerson"
              value={formData.resourcePerson}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Event Date */}
          <div className="form-group">
            <label className="form-label required">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Start Time */}
          <div className="form-group">
            <label className="form-label required">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Allocated Seats */}
          <div className="form-group">
            <label className="form-label required">Allocated Seats</label>
            <input
              type="number"
              name="allocatedSeats"
              value={formData.allocatedSeats}
              onChange={handleChange}
              className="form-input"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Updating Event...' : 'Update Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;