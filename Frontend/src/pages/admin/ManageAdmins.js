import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAllUsers, deleteUser, toggleUserStatus } from '../../services/adminService';
import './ManageUsers.css';

const ManageAdmins = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Wait for auth to initialize
    if (user === null) return;
    
    if (isAuth && user?.userType === 'admin') {
      fetchAdmins();
    } else {
      navigate('/login');
    }
  }, [isAuth, user, navigate]);

  const fetchAdmins = async () => {
    try {
      const response = await getAllUsers();
      setAdmins(response.data.admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      alert('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await deleteUser('admin', id);
        alert('Admin deleted successfully');
        fetchAdmins();
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin');
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleUserStatus('admin', id);
      alert(`Admin ${currentStatus ? 'deactivated' : 'activated'} successfully`);
      fetchAdmins();
    } catch (error) {
      console.error('Error toggling status:', error);
      alert('Failed to toggle status');
    }
  };

  const filteredAdmins = admins.filter(admin =>
    `${admin.firstName} ${admin.lastName} ${admin.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="manage-users">
      <div className="manage-container">
        <div className="manage-header">
          <h1>Manage Admins</h1>
          <div className="header-actions">
            <button className="btn-create" onClick={() => navigate('/admin/create-admin')}>
              + Add Admin
            </button>
            <button className="btn-back" onClick={() => navigate('/admin/dashboard')}>
              ← Back
            </button>
          </div>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="users-count">
          Total Admins: {filteredAdmins.length}
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No admins found
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((admin) => (
                  <tr key={admin._id}>
                    <td>{admin.firstName} {admin.lastName}</td>
                    <td>{admin.email}</td>
                    <td>
                      <span className="role-badge">{admin.role}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${admin.isActive ? 'active' : 'inactive'}`}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className={`btn-toggle ${admin.isActive ? 'deactivate' : 'activate'}`}
                          onClick={() => handleToggleStatus(admin._id, admin.isActive)}
                        >
                          {admin.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(admin._id)}
                          disabled={admin._id === user?._id}
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

export default ManageAdmins;
