import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, deleteUser, toggleUserStatus } from '../../services/adminService';
import './ManageUsers.css';

const ManageInstructors = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuth || user?.userType !== 'admin') {
      navigate('/login');
      return;
    }
    fetchInstructors();
  }, [isAuth, user, navigate]);

  const fetchInstructors = async () => {
    try {
      const response = await getAllUsers();
      setInstructors(response.data.instructors);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      alert('Failed to fetch instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await deleteUser('instructor', id);
        alert('Instructor deleted successfully');
        fetchInstructors();
      } catch (error) {
        console.error('Error deleting instructor:', error);
        alert('Failed to delete instructor');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUserStatus('instructor', id);
      alert(`Instructor ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchInstructors();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  const filteredInstructors = instructors.filter(instructor =>
    `${instructor.firstName} ${instructor.lastName} ${instructor.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-users">
      <div className="manage-container">
        <div className="manage-header">
          <h1>Manage Instructors</h1>
          <div className="header-actions">
            <button className="btn-create" onClick={() => navigate('/admin/create-instructor')}>
              + Add Instructor
            </button>
            <button className="btn-back" onClick={() => navigate('/admin/dashboard')}>
              ← Back
            </button>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="users-count">
          Total Instructors: {filteredInstructors.length}
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Courses</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructors.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    No instructors found
                  </td>
                </tr>
              ) : (
                filteredInstructors.map((instructor) => (
                  <tr key={instructor._id}>
                    <td>{instructor.firstName} {instructor.lastName}</td>
                    <td>{instructor.email}</td>
                    <td>{instructor.countryCode} {instructor.phoneNumber}</td>
                    <td>
                      <span className={`status-badge ${instructor.isActive ? 'active' : 'inactive'}`}>
                        {instructor.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{instructor.courses?.length || 0}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className={`btn-toggle ${instructor.isActive ? 'deactivate' : 'activate'}`}
                          onClick={() => handleToggleStatus(instructor._id, instructor.isActive)}
                        >
                          {instructor.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(instructor._id)}
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

export default ManageInstructors;
