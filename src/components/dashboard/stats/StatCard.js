import React from 'react';
import { Link } from 'react-router-dom';
import './StatCard.css';

const StatCard = ({ title, value, subtitle, icon, iconColor, linkTo = "#" }) => {
  return (
    <Link to={linkTo} className="stat-card-wrapper">
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: iconColor }}>
          {icon}
        </div>
        <div className="stat-content">
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
          <div className="stat-subtitle">{subtitle}</div>
        </div>
      </div>
    </Link>
  );
};

export default StatCard;