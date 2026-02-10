import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents } from '../../services/eventService';
import { FiCalendar, FiClock } from 'react-icons/fi';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return <div className="loading-state">Loading events...</div>;
  }

  return (
    <div className="events-page">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-count">{events.length} events</h2>
        </div>

        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events available at the moment</p>
          </div>
        ) : (
          <div className="events-grid-public">
            {events.map((event) => (
              <div 
                key={event._id} 
                className="public-event-card"
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <div className="public-event-image">
                  <img 
                    src={`http://localhost:5001${event.image}`} 
                    alt={event.title}
                    onError={(e) => {
                      e.target.src = '/placeholder-image.png';
                    }}
                  />
                </div>
                <div className="public-event-info">
                  <h3 className="public-event-title">{event.title}</h3>
                  
                  <div className="public-event-meta">
                    <div className="meta-item-public">
                      <FiCalendar className="meta-icon-public" />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>
                    <div className="meta-item-public">
                      <FiClock className="meta-icon-public" />
                      <span>{formatTime(event.startTime)}</span>
                    </div>
                  </div>
                  
                  <span className="public-event-category">{event.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;