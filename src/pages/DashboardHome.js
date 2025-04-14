import React from 'react';
import '../styles/DashboardHome.css';
import DashboardStats from '../components/dashboard/stats/DashboardStats';
import OptimizedOrdersDataTable from '../components/dashboard/tables/OptimizedOrdersDataTable';
import GuruDataTable from '../components/dashboard/tables/guru/GuruDataTable';

function DashboardHome() {
  return (
    <div className="dashboard-home">
      <DashboardStats />
      
      {/* DataTable yang dioptimalkan */}
      <OptimizedOrdersDataTable />
      
      {/* DataTable Guru */}
      <GuruDataTable />
    </div>
  );
}

export default DashboardHome;