import React from 'react';
import '../styles/DashboardHome.css';
import GuruDataTable from '../components/dashboard/tables/guru/GuruDataTable';

function GuruPage() {
  return (
    <div className="dashboard-home">
      <GuruDataTable />
    </div>
  );
}

export default GuruPage;