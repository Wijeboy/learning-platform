import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import InstructorLayout from './components/InstructorLayout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageInstructors from './pages/admin/ManageInstructors';
import ManageAdmins from './pages/admin/ManageAdmins';
import CreateAdmin from './pages/admin/CreateAdmin';
import CreateInstructor from './pages/admin/CreateInstructor';
import AdminProfile from './pages/admin/AdminProfile';
import PendingInstructors from './pages/admin/PendingInstructors';
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import EditProduct from './pages/admin/EditProduct';
import AddEvent from './pages/admin/AddEvent';
import ManageEvents from './pages/admin/ManageEvents';
import EditEvent from './pages/admin/EditEvent';
import AddBlog from './pages/admin/AddBlog';
import ManageBlogs from './pages/admin/ManageBlogs';
import EditBlog from './pages/admin/EditBlog';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourseView from './pages/student/StudentCourseView';
import StudentProfile from './pages/student/StudentProfile';
import InstructorDashboard from './pages/instructor/InstructorDashboard';
import MyCourses from './pages/instructor/MyCourses/MyCourses';
import AddCourse from './pages/instructor/AddCourse/AddCourse';
import EditCourse from './pages/instructor/EditCourse/EditCourse';
import InstructorStudents from './pages/instructor/InstructorStudents/InstructorStudents';
import InstructorAnalytics from './pages/instructor/InstructorAnalytics/InstructorAnalytics';
import InstructorProfile from './pages/instructor/InstructorProfile/InstructorProfile';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/CourseDetail/CourseDetail';
import Shop from './pages/Shop/Shop';
import ShopDetail from './pages/ShopDetail/ShopDetail';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Events from './pages/Events/Events';
import EventDetail from './pages/EventDetail/EventDetail';
import Blog from './pages/Blog/Blog';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import AboutUs from './pages/AboutUs/AboutUs';
import './App.css';

// Inactivity timeout component
function InactivityTimeout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    if (!user) return;

    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        logout();
        navigate('/login');
        alert('You have been logged out due to inactivity.');
      }, INACTIVITY_TIMEOUT);
    };

    // Events that indicate user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer);
    });

    // Initialize timer
    resetTimer();

    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [user, logout, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <InactivityTimeout />
        <Routes>
          {/* Public Routes with Navbar and Footer */}
          <Route path="/" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Home />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/home" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Home />
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

          <Route path="/courses" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Courses />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/courses/:id" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <CourseDetail />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/shop" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Shop />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/shop/:id" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <ShopDetail />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/cart" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Cart />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/checkout" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Checkout />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/events" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Events />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/events/:id" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <EventDetail />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/blog" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <Blog />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/blog/:id" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <BlogDetail />
              </main>
              <Footer />
            </div>
          } />

          <Route path="/about" element={
  <div className="App">
    <Navbar />
    <main style={{ flex: 1 }}>
      <AboutUs />
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
            <Route path="pending-instructors" element={<PendingInstructors />} />
            <Route path="create-admin" element={<CreateAdmin />} />
            <Route path="create-instructor" element={<CreateInstructor />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="manage-events" element={<ManageEvents />} />
            <Route path="edit-event/:id" element={<EditEvent />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="manage-blogs" element={<ManageBlogs />} />
            <Route path="edit-blog/:id" element={<EditBlog />} />
          </Route>

          {/* Student Routes */}
          <Route path="/student/dashboard" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <StudentDashboard />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/student/profile" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <StudentProfile />
              </main>
              <Footer />
            </div>
          } />
          
          <Route path="/student/courses/:id" element={
            <div className="App">
              <Navbar />
              <main style={{ flex: 1 }}>
                <StudentCourseView />
              </main>
              <Footer />
            </div>
          } />

          {/* Instructor Routes with Custom Layout */}
          <Route path="/instructor" element={<InstructorLayout />}>
            <Route path="dashboard" element={<InstructorDashboard />} />
            <Route path="courses" element={<MyCourses />} />
            <Route path="courses/add" element={<AddCourse />} />
            <Route path="courses/:id/edit" element={<EditCourse />} />
            <Route path="students" element={<InstructorStudents />} />
            <Route path="analytics" element={<InstructorAnalytics />} />
            <Route path="profile" element={<InstructorProfile />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;