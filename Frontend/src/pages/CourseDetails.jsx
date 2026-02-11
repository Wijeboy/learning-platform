import React from 'react';
import './CourseDetails.css';

const CoursePage = () => {
    return (
        <div className="page-wrapper">
            {/* 1. Header Section */}
            <div className="course-header-bg">
                <h1>Course Details</h1>
                <p className="breadcrumb">Home &nbsp;›&nbsp; Course Details</p>
            </div>

            {/* 2. Banner Area - Orange & Blue split */}
            <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div className="instructor-card" style={{ flex: 1 }}>
                    
                    <img src="https://www.heatware.net/wp-content/uploads/larvavel.png" alt="Instructor" style={{height: '300px'}} />
                </div>
                <div className="info-banner-blue" style={{ flex: 2 }}>
                    <span>School of Computing Undergraduate Level</span>
                    <h2>Advanced Diploma Course in Full-Stack Laravel</h2>
                </div>
            </div>

            {/* 3. Main Layout with Tabs and Sidebar */}
            <div className="main-layout">
                <div className="left-content">
                    <div className="tab-container">
                        <button className="tab-link active">Overview</button>
                        <button className="tab-link">Course Outline</button>
                        <button className="tab-link">Fees</button>
                    </div>

                    <h3 className="section-h">Overview</h3>
                    <p style={{ color: '#666', lineHeight: '1.6' }}>
                        To apply for a specialized Laravel and Web Development program, you typically need a minimum of 2 C's at A-Level...
                        mastering the MERN stack and modern frameworks is essential for industry success.
                    </p>

                    <h3 className="section-h">Course Outline</h3>
                    <div className="accordion-bar">
                        <span>Semester 1</span>
                        <span>▼</span>
                    </div>
                    <div className="accordion-bar">
                        <span>Semester 2</span>
                        <span>▼</span>
                    </div>

                    <h3 className="section-h">Fees</h3>
                    <div className="fee-card-ui">
                        <div className="fee-top">6 Month Access</div>
                        <div className="fee-body fee-mid">
                            <p>Resources Cost: <span style={{float:'right'}}>USD 50</span></p>
                            <hr />
                            <p style={{fontWeight:'bold'}}>Total Investment: <span style={{float:'right'}}>USD 50</span></p>
                        </div>
                    </div>
                </div>

                {/* Optional Sidebar as seen in some designs */}
                <div className="right-sidebar" style={{marginTop: '100px'}}>
                    <div style={{padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '15px', border: '1px solid #eee'}}>
                        <h4>Lecture Panel</h4>
                        <p style={{fontSize: '13px', color: '#666'}}>
                            Join our community of experts and start your journey today.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;