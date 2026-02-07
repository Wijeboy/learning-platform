import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

import InstructorDetails from './pages/InstructorDetails';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageInstructors from './pages/admin/ManageInstructors';
import ManageAdmins from './pages/admin/ManageAdmins';
import CreateAdmin from './pages/admin/CreateAdmin';
import CreateInstructor from './pages/admin/CreateInstructor';
import AdminProfile from './pages/admin/AdminProfile';

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
              <Route path="/InstructorDetails" element={<InstructorDetails />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
          <Footer />
        </div>

        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Login />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/login" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Login />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/signup" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <SignUp />
              </main>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="manage-students" element={<ManageStudents />} />
            <Route path="manage-instructors" element={<ManageInstructors />} />
            <Route path="manage-admins" element={<ManageAdmins />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="create-instructor" element={<CreateInstructor />} />
          </Route>
        </Routes>

      </AuthProvider>
    </Router>
  );
}

export default App;