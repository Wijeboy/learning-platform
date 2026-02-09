const API_URL = 'http://localhost:5001/api';

// Create purchase
export const createPurchase = async (paymentDetails) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(paymentDetails),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to complete purchase');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Get my purchases (resources)
export const getMyPurchases = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/purchases`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch purchases');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Get all purchases (Admin only)
export const getAllPurchases = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/purchases/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch all purchases');
    }

    return data;
  } catch (error) {
    throw error;
  }
};