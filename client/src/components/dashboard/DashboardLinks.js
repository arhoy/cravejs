import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLinks = () => {
    return (
        <div className="Dashboard__links">
        <ul>
          <li> <Link className = "Dashboard__link" to = "edit-profile">Edit Profile</Link> </li>
          <li> <Link className = "Dashboard__link" to = "add-experience"> Add Experience</Link> </li>
          <li> <Link className = "Dashboard__link" to = "add-education"> Add Education</Link> </li>
          <li> <Link className = "Dashboard__link" to = "/todo"> Your Todo List </Link> </li>
        </ul>
        </div>
    );
};

export default DashboardLinks;