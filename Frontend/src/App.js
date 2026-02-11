import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignUp from './pages/SignUp';
import './App.css';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add more routes as needed */}
            <Routes>
            <Route path="CourseDetails" element={<CourseDetails />} />
            <Route path="/CCourseDetails" element={<CourseDetails />} />
            </Routes>
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;