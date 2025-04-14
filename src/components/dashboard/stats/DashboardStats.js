import React from 'react';
import StatCard from './StatCard';
import './DashboardStats.css';

const DashboardStats = () => {
  // Icon components - simplified
  const Icon = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );

  // Stats data
  const statsData = [
    {
      title: "GURU",
      value: "42",
      subtitle: "↑ 2 Baru",
      icon: (
        <Icon>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </Icon>
      ),
      iconColor: "#6366f1",
      linkTo: "#"
    },
    {
      title: "MURID",
      value: "1,278",
      subtitle: "↑ 56 Baru",
      icon: (
        <Icon>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </Icon>
      ),
      iconColor: "#f97316",
      linkTo: "#"
    },
    {
      title: "ASRAMA",
      value: "4",
      subtitle: "Kapasitas penuh",
      icon: (
        <Icon>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </Icon>
      ),
      iconColor: "#10b981",
      linkTo: "#"
    },
    {
      title: "GOBLIN",
      value: "26",
      subtitle: "↑ 3 Baru",
      icon: (
        <Icon>
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="10" r="3"></circle>
        </Icon>
      ),
      iconColor: "#3b82f6",
      linkTo: "#"
    },
    {
      title: "STAF",
      value: "68",
      subtitle: "↑ 5 Baru",
      icon: (
        <Icon>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </Icon>
      ),
      iconColor: "#ec4899",
      linkTo: "#"
    },
    {
      title: "SELLER",
      value: "24",
      subtitle: "↑ 2 Baru",
      icon: (
        <Icon>
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
        </Icon>
      ),
      iconColor: "#f59e0b",
      linkTo: "#"
    },
    {
      title: "KEPALA",
      value: "1",
      subtitle: "2020-2025",
      icon: (
        <Icon>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </Icon>
      ),
      iconColor: "#ef4444",
      linkTo: "#"
    },
    {
      title: "CALON",
      value: "324",
      subtitle: "↑ 84 Minggu ini",
      icon: (
        <Icon>
          <circle cx="12" cy="7" r="4"></circle>
          <path d="M5 22v-4a7 7 0 0 1 14 0v4"></path>
        </Icon>
      ),
      iconColor: "#4f46e5",
      linkTo: "#"
    }
  ];

  return (
    <div className="dashboard-stats">
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title} 
            value={stat.value} 
            subtitle={stat.subtitle} 
            icon={stat.icon} 
            iconColor={stat.iconColor}
            linkTo={stat.linkTo}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;