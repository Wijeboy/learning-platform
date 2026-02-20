const API_URL = 'http://localhost:5001/api';

// Enroll in a course
export const enrollInCourse = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ courseId })
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to enroll in course');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get student's enrollments
export const getMyEnrollments = async (status = null) => {
  try {
    const token = localStorage.getItem('token');
    const params = status ? `?status=${status}` : '';
    const response = await fetch(`${API_URL}/enrollments/my-courses${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enrollments');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get single enrollment
export const getEnrollment = async (enrollmentId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments/${enrollmentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enrollment');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get enrollment by course ID
export const getEnrollmentByCourse = async (courseId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enrollment');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Update lesson progress
export const updateProgress = async (enrollmentId, lessonId, progressData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/enrollments/${enrollmentId}/progress/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(progressData)
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update progress');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};

// Get instructor's student enrollments
export const getInstructorEnrollments = async (courseId = null) => {
  try {
    const token = localStorage.getItem('token');
    const params = courseId ? `?courseId=${courseId}` : '';
    const response = await fetch(`${API_URL}/enrollments/instructor/students${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enrollments');
    }
    
    return data.data;
  } catch (error) {
    throw error;
  }
};
