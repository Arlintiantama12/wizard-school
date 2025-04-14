import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className={`dashboard-container ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <TopNavbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;