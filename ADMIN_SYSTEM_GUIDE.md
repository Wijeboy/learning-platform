# Admin System - Complete Guide

## Overview
The admin system has been successfully created with full functionality to manage students, instructors, and other admins.

## Test Admin Account
**Email:** admin@learnx.com  
**Password:** Admin123

## Features Implemented

### 1. Admin Dashboard
- **URL:** `/admin/dashboard`
- **Features:**
  - Overview cards showing total students, instructors, and admins
  - Quick action buttons to navigate to management pages
  - Buttons to create new instructors and admins

### 2. Manage Students
- **URL:** `/admin/manage-students`
- **Features:**
  - View all registered students in a table
  - Search functionality
  - Activate/Deactivate student accounts
  - Delete student accounts
  - View enrollment information

### 3. Manage Instructors
- **URL:** `/admin/manage-instructors`
- **Features:**
  - View all instructors in a table
  - Search functionality
  - Activate/Deactivate instructor accounts
  - Delete instructor accounts
  - View course assignments
  - Quick link to create new instructor

### 4. Manage Admins
- **URL:** `/admin/manage-admins`
- **Features:**
  - View all admin accounts
  - Search functionality
  - Activate/Deactivate admin accounts
  - Delete admin accounts (cannot delete self)
  - View admin roles (admin/super-admin)
  - Quick link to create new admin

### 5. Create Admin
- **URL:** `/admin/create-admin`
- **Features:**
  - Form to create new admin accounts
  - Fields: First Name, Last Name, Email, Role, Password, Confirm Password
  - Real-time validation
  - Role selection (admin/super-admin)

### 6. Create Instructor
- **URL:** `/admin/create-instructor`
- **Features:**
  - Form to create new instructor accounts
  - Fields: First Name, Last Name, Email, Country, Phone Number, Password, Confirm Password
  - Country selection with 70+ countries
  - Real-time validation

## Backend API Endpoints

All admin endpoints are protected with JWT authentication and require admin role.

### Base URL: `http://localhost:5001/api/admin`

#### Get All Users
- **GET** `/users`
- Returns: `{ students: [], instructors: [], admins: [] }`

#### Create Admin
- **POST** `/create-admin`
- Body: `{ firstName, lastName, email, password, role }`

#### Create Instructor
- **POST** `/create-instructor`
- Body: `{ firstName, lastName, email, phoneNumber, countryCode, password }`

#### Update User
- **PUT** `/users/:userType/:id`
- userType: 'student', 'instructor', or 'admin'

#### Delete User
- **DELETE** `/users/:userType/:id`
- userType: 'student', 'instructor', or 'admin'

#### Toggle User Status
- **PATCH** `/users/:userType/:id/toggle-status`
- Activates/Deactivates user account

## How to Use

### 1. Start the Backend
```bash
cd Backend
npm start
```
Server runs on: http://localhost:5001

### 2. Start the Frontend
```bash
cd Frontend
npm start
```
Frontend runs on: http://localhost:3000

### 3. Login as Admin
1. Go to http://localhost:3000/login
2. Enter:
   - Email: admin@learnx.com
   - Password: Admin123
3. Click LOGIN
4. You'll be redirected to the admin dashboard

### 4. Manage Users
- From the dashboard, click on any management card
- Use the search bar to find specific users
- Use action buttons to activate/deactivate or delete users
- Click "Add Instructor" or "Add Admin" buttons to create new users

## File Structure

### Frontend
```
Frontend/src/pages/admin/
├── AdminDashboard.js       # Main dashboard
├── AdminDashboard.css      # Dashboard styles
├── ManageStudents.js       # Student management
├── ManageInstructors.js    # Instructor management
├── ManageAdmins.js         # Admin management
├── ManageUsers.css         # Shared management styles
├── CreateAdmin.js          # Create admin form
├── CreateInstructor.js     # Create instructor form
└── CreateUser.css          # Shared form styles
```

### Backend
```
Backend/
├── models/
│   ├── Student.js          # Student model
│   ├── Instructor.js       # Instructor model
│   └── Admin.js            # Admin model
├── controllers/
│   ├── authController.js   # Auth for all user types
│   └── adminController.js  # Admin operations
├── middleware/
│   ├── authMiddleware.js   # Student auth
│   └── adminMiddleware.js  # Admin auth
├── routes/
│   ├── authRoutes.js       # Auth routes
│   └── adminRoutes.js      # Admin routes
└── createAdmin.js          # Script to create sample admin
```

## Security Features

1. **JWT Authentication:** All admin routes require valid JWT token
2. **Role-Based Access:** Only admin users can access admin routes
3. **Password Hashing:** All passwords are hashed using bcrypt with cost factor 12
4. **Active Status Check:** Deactivated admins cannot log in
5. **Self-Protection:** Admins cannot delete their own account

## Routes Protection

All admin routes automatically check:
- If user is logged in (has valid JWT token)
- If user's role is 'admin'
- If trying to access directly, user is redirected to login

## Auto-Logout Feature

The inactivity timeout (1 minute) still works for admin users. If an admin is inactive for 60 seconds, they will be automatically logged out.

## Next Steps

You can now:
1. Login with the admin account
2. View all registered students
3. Create new instructors
4. Create new admins
5. Manage all user accounts
6. Activate/Deactivate accounts
7. Delete accounts as needed

## Support

If you encounter any issues:
1. Make sure both backend and frontend servers are running
2. Check browser console for any errors
3. Verify MongoDB connection is active
4. Ensure you're using the correct login credentials
