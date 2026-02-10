const API_URL = 'http://localhost:5001/api';

// Get all blogs
export const getAllBlogs = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);

    const response = await fetch(`${API_URL}/blogs?${queryParams.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch blogs');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Get single blog
export const getBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch blog');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Create blog (Admin only)
export const createBlog = async (formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create blog');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Update blog (Admin only)
export const updateBlog = async (id, formData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update blog');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Delete blog (Admin only)
export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete blog');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Add comment to blog
export const addComment = async (id, commentData) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add comment');
    }

    return data;
  } catch (error) {
    throw error;
  }
};