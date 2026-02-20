import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../services/eventService';
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import './EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return <div className="loading-state">Loading event...</div>;
  }

  if (!event) {
    return <div className="error-state">Event not found</div>;
  }

  return (
    <div className="event-detail-page">
      <div className="event-detail-container">
        {/* Event Image */}
        <div className="event-detail-image-container">
          <img 
            src={`http://localhost:5001${event.image}`} 
            alt={event.title}
            className="event-detail-image"
            onError={(e) => {
              e.target.src = '/placeholder-image.png';
            }}
          />
        </div>

        <div className="event-detail-content">
          {/* Left Column - Event Details */}
          <div className="event-detail-left">
            <span className="event-detail-category">{event.category}</span>
            
            <h1 className="event-detail-title">{event.title}</h1>
            
            <div className="event-resource-person">
              <FiUser className="person-icon" />
              <span>by {event.resourcePerson}</span>
            </div>

            <div className="event-section">
              <h2 className="section-title">Event Overview</h2>
              <p className="section-text">
                Registration and entry passes will be available at the venue entrance upon payment of the prescribed fee. 
                All participants will receive a certificate of completion following the conclusion of the session.
              </p>
            </div>

            <div className="event-section">
              <h2 className="section-title">What You'll Learn</h2>
              <p className="section-text">{event.eventDescription}</p>
            </div>
          </div>

          {/* Right Column - Event Info Box */}
          <div className="event-detail-right">
            <div className="event-info-box">
              <div className="event-fee-box">
                <span className="fee-label">Event Fee</span>
                <span className="fee-amount">${event.eventFee}</span>
              </div>

              <div className="event-details-list">
                <div className="detail-item">
                  <FiCalendar className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{formatDate(event.eventDate)}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiClock className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Time</span>
                    <span className="detail-value">{formatTime(event.startTime)}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiMapPin className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FiUsers className="detail-icon" />
                  <div className="detail-content">
                    <span className="detail-label">Allocated Seats</span>
                    <span className="detail-value">{event.allocatedSeats}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;