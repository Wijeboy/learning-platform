const API_URL = 'http://localhost:5001/api';

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Create new admin
export const createAdmin = async (adminData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/create-admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create admin');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Create new instructor
export const createInstructor = async (instructorData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/create-instructor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(instructorData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create instructor');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update user
export const updateUser = async (userType, id, updates) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/users/${userType}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Delete user
export const deleteUser = async (userType, id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/users/${userType}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Toggle user status
export const toggleUserStatus = async (userType, id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/users/${userType}/${id}/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle user status');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update admin profile
export const updateAdminProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to update profile');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Service error:', error);
    throw error;
  }
};

// Upload profile photo
export const uploadProfilePhoto = async (formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    // Convert file to base64
    const file = formData.get('photo');
    console.log('File to upload:', file);
    
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    console.log('Base64 created, length:', base64.length);

    const response = await fetch(`${API_URL}/admin/profile-photo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ photo: base64 }),
    });

    const data = await response.json();
    console.log('Upload response:', data);

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to upload photo');
      error.response = { data };
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Upload service error:', error);
    throw error;
  }
};

// Check if email exists
export const checkEmailExists = async (email) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/check-email/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to check email');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Get pending instructor applications
export const getPendingInstructors = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/pending-instructors`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response. Please check if backend is running.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch pending instructors');
    }

    return data;
  } catch (error) {
    console.error('getPendingInstructors error:', error);
    throw error;
  }
};

// Approve instructor application
export const approveInstructor = async (instructorId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/approve-instructor/${instructorId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to approve instructor');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Decline instructor application
export const declineInstructor = async (instructorId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/admin/decline-instructor/${instructorId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to decline instructor');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
