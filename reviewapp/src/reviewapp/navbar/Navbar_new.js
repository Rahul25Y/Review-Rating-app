import React from "react";
import star from "../assets/pr1.jpg";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Navbar.css";

export default function Navbar_new() {
  const navigate = useNavigate();
  const res = localStorage.getItem("user");
  const user = JSON.parse(res);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100 shadow-sm px-2 px-md-3 px-lg-4">
      <div className="container-fluid d-flex justify-content-between">
        {/* Left Section */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <h1 className="h5 fw-bold me-2 mb-0">Review&RATE<span className="start-iocns">☆</span> </h1>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center d-lg-flex d-none">
            {user?.name && (
              <li className="nav-item d-flex align-items-center">
                <h5 className="m-0 me-3 text-primary">Welcome: {user.name}</h5>
                <img
                  className="rounded-circle border"
                  src={`http://localhost:9000${user.profilepic}`}
                  alt="Profile"
                  width="40"
                  height="40"
                />
              </li>
            )}
            <li className="nav-item">
              <Link to="/" onClick={handleLogout} className="btn btn-primary ms-3">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}