import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEvents, deleteEvent } from '../../services/eventService';
import { FiEdit2, FiTrash2, FiMapPin, FiClock } from 'react-icons/fi';
import './ManageEvents.css';

const ManageEvents = () => {
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
      alert('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        alert('Event deleted successfully');
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
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
    <div className="manage-events-page">
      <div className="manage-events-header">
        <h1>Manage Events</h1>
        <button 
          className="add-event-btn"
          onClick={() => navigate('/admin/add-event')}
        >
          + Add New Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events added yet</p>
          <button 
            className="btn-add"
            onClick={() => navigate('/admin/add-event')}
          >
            Add Your First Event
          </button>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="card-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(event._id)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(event._id)}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="event-image">
                <img 
                  src={`http://localhost:5001${event.image}`} 
                  alt={event.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.png';
                  }}
                />
              </div>
              
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                
                <div className="event-meta">
                  <div className="meta-item">
                    <FiMapPin className="meta-icon" />
                    <span>{event.location}</span>
                  </div>
                  <div className="meta-item">
                    <FiClock className="meta-icon" />
                    <span>{formatTime(event.startTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents;