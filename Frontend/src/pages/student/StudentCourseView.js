import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourse } from '../../services/courseService';
import { getEnrollmentByCourse, updateProgress } from '../../services/enrollmentService';
import { FiArrowLeft, FiCheck, FiDownload, FiFileText } from 'react-icons/fi';
import './StudentCourseView.css';

const StudentCourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseAndEnrollment();
  }, [id]);

  const fetchCourseAndEnrollment = async () => {
    try {
      const [courseData, enrollmentData] = await Promise.all([
        getCourse(id),
        getEnrollmentByCourse(id)
      ]);
      
      setCourse(courseData);
      setEnrollment(enrollmentData);
      
      // Set first lesson as current if available
      if (courseData.lessons && courseData.lessons.length > 0) {
        setCurrentLesson(courseData.lessons[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const markLessonComplete = async (lessonId) => {
    try {
      await updateProgress(enrollment._id, lessonId, { completed: true });
      // Refresh enrollment data
      const updatedEnrollment = await getEnrollmentByCourse(id);
      setEnrollment(updatedEnrollment);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const isLessonCompleted = (lessonId) => {
    if (!enrollment || !enrollment.progress) return false;
    const lessonProgress = enrollment.progress.find(p => p.lessonId === lessonId);
    return lessonProgress?.completed || false;
  };

  const getVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  if (loading) {
    return <div className="course-view-loading">Loading course...</div>;
  }

  if (error || !course) {
    return (
      <div className="course-view-error">
        <h2>{error || 'Course not found'}</h2>
        <button onClick={() => navigate('/student/dashboard')} className="btn-back">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="student-course-view">
      <div className="course-view-header">
        <button onClick={() => navigate('/student/dashboard')} className="btn-back-course">
          <FiArrowLeft /> Back to Dashboard
        </button>
        <h1>{course.title}</h1>
        <div className="course-progress-header">
          <span>Progress: {enrollment?.completionPercentage || 0}%</span>
          <div className="progress-bar-header">
            <div 
              className="progress-fill-header" 
              style={{ width: `${enrollment?.completionPercentage || 0}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="course-view-content">
        <div className="video-section">
          {currentLesson ? (
            <>
              <div className="video-player">
                {currentLesson.videoUrl ? (
                  getVideoId(currentLesson.videoUrl) ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getVideoId(currentLesson.videoUrl)}`}
                      title={currentLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls width="100%" height="100%">
                      <source src={currentLesson.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="no-video">No video available for this lesson</div>
                )}
              </div>
              
              <div className="lesson-details">
                <div className="lesson-header-info">
                  <h2>{currentLesson.title}</h2>
                  <button 
                    onClick={() => markLessonComplete(currentLesson._id)}
                    className={`btn-mark-complete ${isLessonCompleted(currentLesson._id) ? 'completed' : ''}`}
                    disabled={isLessonCompleted(currentLesson._id)}
                  >
                    <FiCheck /> {isLessonCompleted(currentLesson._id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
                
                {currentLesson.materials && currentLesson.materials.length > 0 ? (
                  <div className="lesson-materials">
                    <h3><FiFileText /> Lesson Materials ({currentLesson.materials.length})</h3>
                    <div className="materials-list">
                      {currentLesson.materials.map((material, index) => (
                        <a 
                          key={index}
                          href={material.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="material-item"
                        >
                          <FiDownload />
                          <span>{material.title || `Material ${index + 1}`}</span>
                          <span className="material-type">{material.type || 'File'}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="no-materials">
                    <p>📄 No downloadable materials for this lesson</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-lesson-selected">
              <p>Select a lesson to start learning</p>
            </div>
          )}
        </div>

        <div className="lessons-sidebar">
          <h3>Course Content</h3>
          <div className="lessons-list-sidebar">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className={`lesson-item-sidebar ${currentLesson?._id === lesson._id ? 'active' : ''} ${isLessonCompleted(lesson._id) ? 'completed' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="lesson-number-sidebar">{index + 1}</div>
                  <div className="lesson-info-sidebar">
                    <h4>{lesson.title}</h4>
                    {lesson.duration > 0 && (
                      <span className="lesson-duration">{lesson.duration} min</span>
                    )}
                  </div>
                  {isLessonCompleted(lesson._id) && (
                    <div className="lesson-check">
                      <FiCheck />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-lessons">No lessons available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseView;
