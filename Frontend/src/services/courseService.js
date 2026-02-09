const API_URL = 'http://localhost:5001/api';

// Get all published courses
export const getAllCourses = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/courses?${params}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch courses');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get single course
export const getCourse = async (courseId) => {
  try {
    const response = await fetch(`${API_URL}/courses/${courseId}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch course');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get instructor's courses
export const getInstructorCourses = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/instructor/my-courses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch courses');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Create course
export const createCourse = async (courseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(courseData)
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create course');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Update course
export const updateCourse = async (courseId, courseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(courseData)
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update course');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Delete course
export const deleteCourse = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete course');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

// Add lesson to course
export const addLesson = async (courseId, lessonData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lessonData)
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add lesson');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Update lesson
export const updateLesson = async (courseId, lessonId, lessonData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(lessonData)
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update lesson');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Delete lesson
export const deleteLesson = async (courseId, lessonId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete lesson');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Toggle publish status
export const togglePublishCourse = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/courses/${courseId}/publish`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update course status');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};
