import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getPendingInstructors, approveInstructor, declineInstructor } from '../../services/adminService';
import './ManageUsers.css';

const PendingInstructors = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!isAuth || user?.userType !== 'admin') {
      navigate('/login');
      return;
    }
    fetchPendingInstructors();
  }, [isAuth, user, navigate]);

  const fetchPendingInstructors = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching pending instructors...');
      const response = await getPendingInstructors();
      console.log('Response:', response);
      setInstructors(response.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch pending instructors');
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (instructorId) => {
    if (!window.confirm('Are you sure you want to approve this instructor?')) {
      return;
    }

    try {
      setProcessingId(instructorId);
      await approveInstructor(instructorId);
      alert('Instructor approved successfully!');
      fetchPendingInstructors(); // Refresh the list
    } catch (err) {
      alert(err.message || 'Failed to approve instructor');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (instructorId) => {
    if (!window.confirm('Are you sure you want to decline this instructor application?')) {
      return;
    }

    try {
      setProcessingId(instructorId);
      await declineInstructor(instructorId);
      alert('Instructor application declined');
      fetchPendingInstructors(); // Refresh the list
    } catch (err) {
      alert(err.message || 'Failed to decline instructor');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuth || user?.userType !== 'admin') {
    return null;
  }

  return (
    <div className="manage-users">
      <div className="manage-header">
        <h1>Pending Instructor Applications</h1>
        <div className="header-actions">
          <span className="count-badge">{instructors.length} Pending</span>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : instructors.length === 0 ? (
        <div className="no-data">
          <p>No pending instructor applications</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor._id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {instructor.firstName[0]}{instructor.lastName[0]}
                      </div>
                      <div>
                        <div className="user-name">
                          {instructor.firstName} {instructor.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{instructor.email}</td>
                  <td>{instructor.countryCode} {instructor.phoneNumber}</td>
                  <td>{formatDate(instructor.createdAt)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(instructor._id)}
                        disabled={processingId === instructor._id}
                      >
                        {processingId === instructor._id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        className="btn-decline"
                        onClick={() => handleDecline(instructor._id)}
                        disabled={processingId === instructor._id}
                      >
                        {processingId === instructor._id ? 'Processing...' : 'Decline'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingInstructors;
