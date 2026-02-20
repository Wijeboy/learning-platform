import React from 'react';
import { Outlet } from 'react-router-dom';
import InstructorNavbar from './InstructorNavbar';
import InstructorFooter from './InstructorFooter';
import './InstructorLayout.css';

const InstructorLayout = () => {
  return (
    <div className="instructor-layout">
      <InstructorNavbar />
      <main className="instructor-main-content">
        <Outlet />
      </main>
      <InstructorFooter />
    </div>
  );
};

export default InstructorLayout;
