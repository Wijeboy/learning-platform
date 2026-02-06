import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, deleteUser, toggleUserStatus } from '../../services/adminService';
import './ManageUsers.css';

const ManageStudents = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuth || user?.userType !== 'admin') {
      navigate('/login');
      return;
    }
    fetchStudents();
  }, [isAuth, user, navigate]);

  const fetchStudents = async () => {
    try {
      const response = await getAllUsers();
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteUser('student', id);
        alert('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUserStatus('student', id);
      alert(`Student ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchStudents();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName} ${student.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-users">
      <div className="manage-container">
        <div className="manage-header">
          <h1>Manage Students</h1>
          <button className="btn-back" onClick={() => navigate('/admin/dashboard')}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="users-count">
          Total Students: {filteredStudents.length}
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Enrolled Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No students found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstName} {student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.countryCode} {student.phoneNumber}</td>
                    <td>
                      <span className={`status-badge ${student.isActive ? 'active' : 'inactive'}`}>
                        {student.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{student.enrolledCourses?.length || 0}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className={`btn-toggle ${student.isActive ? 'deactivate' : 'activate'}`}
                          onClick={() => handleToggleStatus(student._id, student.isActive)}
                        >
                          {student.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageStudents;
