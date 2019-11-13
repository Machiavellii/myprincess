import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
      {/* <Link to="/upload-cover" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Profile Photo
      </Link>
      <Link to="/upload-gallery" className="btn btn-light">
        <i className="fas fa-user-circle" /> Upload Gallery
      </Link> */}
    </div>
  );
};

export default DashboardActions;
