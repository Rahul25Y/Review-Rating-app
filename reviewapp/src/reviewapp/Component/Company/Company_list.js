import React, { useEffect } from 'react'
import star from "../../assets/pr1.jpg";
import men from "../../assets/MaleImg.jpeg";
import listimage1 from "../../assets/CompanyImg1.avif";
import listimage2 from "../../assets/CompanyImg2.avif";
import { Link, useNavigate } from 'react-router-dom';
import "./Company_list.css";
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../../features/company/CompanySlice';
import Navbar_new from '../../navbar/Navbar_new';

export default function Company_list() {
  const companies= useSelector((state) => state.company);
  const { cmplist_msg,company_data,error,loading,count}= companies;
  const navigate =useNavigate();
  const dispatch =useDispatch();
  useEffect(()=>{
    dispatch(getCompanies());
  },[]);
  return (
    <div>
      <div className="companylist-container">
      <Navbar_new/>
        <div className="Add-company">
          <button  className="add-companybutton"><Link to='/Create_company'>Add Company</Link></button>
        </div>
        <h3 className="list-h3">Total Result:</h3>
        <div className="company-list">
        {company_data && company_data.map(
          ({_id, company_logo, companyName,location,city,founded}) =>(
            <div  className="company-list1">

            <Link to = {`/CompanyDetails/${_id}`}> 

          <img className="list-image" src={`http://localhost:9000${company_logo}`}></img>
          </Link>
          <p>
            <b>{companyName}
            <br/>
            {location}
              <br/>
            {city}<br/>
            {founded}</b>
          </p>
          
          </div>
          
          )
        )}
           
          
{/*         
          <div className="company-list2">

          </div> */}
        </div>
        {/* <div className="company-list">
           
          <div className="company-list1">
          <img className="list-image" src={listimage2}></img>
          <p>
            <b>Coder Id upskills Software Development<br/>
            Center<br/>
            Sekhar Central Manorama Ganj <br/>
            2023</b>
          </p>

          </div>
          <div className="company-list2">

          </div>
        </div> */}
       
      </div>
      
    </div>
  )
}
