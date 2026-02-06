import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageInstructors from './pages/admin/ManageInstructors';
import ManageAdmins from './pages/admin/ManageAdmins';
import CreateAdmin from './pages/admin/CreateAdmin';
import CreateInstructor from './pages/admin/CreateInstructor';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-students" element={<ManageStudents />} />
              <Route path="/admin/manage-instructors" element={<ManageInstructors />} />
              <Route path="/admin/manage-admins" element={<ManageAdmins />} />
              <Route path="/admin/create-admin" element={<CreateAdmin />} />
              <Route path="/admin/create-instructor" element={<CreateInstructor />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;