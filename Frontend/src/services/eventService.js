const API_URL = 'http://localhost:5001/api';

// Get all events
export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Get single event
export const getEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch event');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Create event (Admin only)
export const createEvent = async (formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create event');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update event (Admin only)
export const updateEvent = async (id, formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update event');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Delete event (Admin only)
export const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete event');
    }

    return data;
  } catch (error) {
    throw error;
  }
};