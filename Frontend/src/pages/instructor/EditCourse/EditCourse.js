import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getCourse, updateCourse, addLesson, deleteLesson } from '../../../services/courseService';
import { FiSave, FiArrowLeft, FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import './EditCourse.css';

const EditCourse = () => {
  const { id } = useParams();
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: '',
    category: 'General',
    level: 'Beginner'
  });
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: '',
    videoUrl: '',
    duration: '',
    materials: []
  });
  const [materialInput, setMaterialInput] = useState({ title: '', url: '', type: 'pdf' });

  const categories = [
    'General', 'Programming', 'Design', 'Business', 'Marketing',
    'Photography', 'Music', 'Health & Fitness', 'Language', 'Other'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (isAuth && user?.userType === 'instructor') {
      fetchCourse();
    } else {
      navigate('/login');
    }
  }, [id, isAuth, user, navigate]);

  const fetchCourse = async () => {
    try {
      const data = await getCourse(id);
      setCourse(data);
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        thumbnail: data.thumbnail || '',
        category: data.category,
        level: data.level
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      alert('Failed to load course');
      navigate('/instructor/courses');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCourse(id, {
        ...formData,
        price: parseFloat(formData.price)
      });
      alert('Course updated successfully!');
      fetchCourse();
    } catch (error) {
      console.error('Error updating course:', error);
      alert(error.message || 'Failed to update course');
    } finally {
      setSaving(false);
    }
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonData({ ...lessonData, [name]: value });
  };

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    setMaterialInput({ ...materialInput, [name]: value });
  };

  const addMaterial = () => {
    if (materialInput.title && materialInput.url) {
      setLessonData({
        ...lessonData,
        materials: [...lessonData.materials, { ...materialInput }]
      });
      setMaterialInput({ title: '', url: '', type: 'pdf' });
    }
  };

  const removeMaterial = (index) => {
    const updated = lessonData.materials.filter((_, i) => i !== index);
    setLessonData({ ...lessonData, materials: updated });
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!lessonData.title || !lessonData.videoUrl) {
      alert('Please provide lesson title and video URL');
      return;
    }

    try {
      await addLesson(id, {
        ...lessonData,
        duration: parseInt(lessonData.duration) || 0
      });
      alert('Lesson added successfully!');
      setLessonData({ title: '', videoUrl: '', duration: '', materials: [] });
      setShowLessonForm(false);
      fetchCourse();
    } catch (error) {
      console.error('Error adding lesson:', error);
      alert(error.message || 'Failed to add lesson');
    }
  };

  const handleDeleteLesson = async (lessonId, title) => {
    if (!window.confirm(`Delete lesson "${title}"?`)) {
      return;
    }

    try {
      await deleteLesson(id, lessonId);
      alert('Lesson deleted successfully');
      fetchCourse();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert(error.message || 'Failed to delete lesson');
    }
  };

  if (loading) {
    return <div className="edit-course-page"><div className="loading">Loading course...</div></div>;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="edit-course-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/instructor/courses')}>
          <FiArrowLeft /> Back to My Courses
        </button>
        <h1>Edit Course</h1>
      </div>

      <div className="edit-layout">
        {/* Course Details */}
        <div className="section">
          <h2>Course Details</h2>
          <form onSubmit={handleSaveCourse} className="course-form">
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Level</label>
                <select name="level" value={formData.level} onChange={handleChange}>
                  {levels.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Thumbnail URL</label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={saving}>
              <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Lessons Section */}
        <div className="section">
          <div className="section-header">
            <h2>Course Lessons ({course.lessons?.length || 0})</h2>
            <button className="btn-add" onClick={() => setShowLessonForm(!showLessonForm)}>
              <FiPlus /> Add Lesson
            </button>
          </div>

          {showLessonForm && (
            <form onSubmit={handleAddLesson} className="lesson-form">
              <h3>New Lesson</h3>
              
              <div className="form-group">
                <label>Lesson Title *</label>
                <input
                  type="text"
                  name="title"
                  value={lessonData.title}
                  onChange={handleLessonChange}
                  placeholder="e.g., Introduction to React Hooks"
                  required
                />
              </div>

              <div className="form-group">
                <label>Video URL * (YouTube, Vimeo, etc.)</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={lessonData.videoUrl}
                  onChange={handleLessonChange}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={lessonData.duration}
                  onChange={handleLessonChange}
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="materials-section">
                <h4>Lesson Materials</h4>
                
                <div className="material-input">
                  <input
                    type="text"
                    name="title"
                    value={materialInput.title}
                    onChange={handleMaterialChange}
                    placeholder="Material title"
                  />
                  <input
                    type="url"
                    name="url"
                    value={materialInput.url}
                    onChange={handleMaterialChange}
                    placeholder="Material URL"
                  />
                  <select
                    name="type"
                    value={materialInput.type}
                    onChange={handleMaterialChange}
                  >
                    <option value="pdf">PDF</option>
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                    <option value="other">Other</option>
                  </select>
                  <button type="button" className="btn-add-material" onClick={addMaterial}>
                    Add
                  </button>
                </div>

                {lessonData.materials.length > 0 && (
                  <div className="materials-list">
                    {lessonData.materials.map((mat, index) => (
                      <div key={index} className="material-item">
                        <span>{mat.title} ({mat.type})</span>
                        <button type="button" onClick={() => removeMaterial(index)}>
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowLessonForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <FiPlus /> Add Lesson
                </button>
              </div>
            </form>
          )}

          <div className="lessons-list">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, index) => (
                <div key={lesson._id} className="lesson-item">
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-info">
                    <h4>{lesson.title}</h4>
                    <div className="lesson-meta">
                      <span>⏱️ {lesson.duration || 0} min</span>
                      <span>📎 {lesson.materials?.length || 0} materials</span>
                    </div>
                  </div>
                  <div className="lesson-actions">
                    <button
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteLesson(lesson._id, lesson.title)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-lessons">
                <p>No lessons added yet. Click "Add Lesson" to get started.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
