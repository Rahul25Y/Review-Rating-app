import React from 'react'
import star from "../assets/pr1.jpg";
import men from "../assets/MaleImg.jpeg";
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar_new() {
  const navigate = useNavigate();
  const res = localStorage.getItem("user");

  const user =JSON.parse(res);
  const handleLogout =()=>{
    localStorage.clear();
  };
  return (
    <div>
    
      <div className="company-navbar">
          <div className="company-navleft">
            <h1>Review&RATE</h1>
            <img className="navstar-image" src={star}></img>
           
          </div>
          <div className="company-navright">
          { user?.name ? (
            <h4 className="welcome5">Welcome:{user.name}</h4>
          ):(
            navigate("/")
          )}
           
            <img className="navmen-image" src={`http://localhost:9000${user.profilepic}`}></img>
            <button className="compannybutton"><Link to='/' onClick={handleLogout}>Logout</Link></button>
          </div>
        </div>
    </div>
  )
}
