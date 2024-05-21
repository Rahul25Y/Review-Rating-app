import React, { useEffect, useState } from "react";
import "../Company/CreateComany.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCompany,clearState } from "../../features/company/CompanySlice";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



export const CreateCompany = () => {
 const [pic,setPic]=useState("");
 const dispatch=useDispatch();
 const navigate=useNavigate();
 const companyData=useSelector((state)=>state.company);
 let {error,loading,cmpcreate_msg}=companyData;

 useEffect(() => {
  if(cmpcreate_msg) {
    toast.success(cmpcreate_msg, { position: toast.POSITION.TOP_CENTER });
    setTimeout(()=>{
      dispatch(clearState());
      navigate('/Company_list');
    },1000)
  }
  if(error) {
    toast.error(error, {position: toast.POSITION.TOP_CENTER});
  }
  
}, [cmpcreate_msg, error]);
  const initialState = {
    companyName: "",
    location: "",
    city: "",
    founded: "",
  };
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("Please enter company name"),
    location: yup.string().required("Please enter company location"),
    city: yup.string().required("Please enter city"),
    founded: yup.string().required("Please enter company founded date"),
  });

  function handleSubmit(values) {
 
    const user=JSON.parse(localStorage.getItem("user"));
   
    let obj={
      ...values,
      company_logo: pic,
      userId: user._id,
    };
   console.log(obj)
    dispatch( createCompany(obj));
    
  };
  function addCompanyPic(e){
    setPic(e.target.files[0]);
  }

  return (
    <>
    <ToastContainer/>
      <div className="add-container">
        <div className="add-company">
          <h1 className="add-com-h1">Add Company</h1>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="createCom-form">
              <label>Company name</label> <br />
              <Field
                className="add-com-input"
                type="text"
                name="companyName"
                placeholder="Enter..."
              />
              <br />
              <span className="danger"><ErrorMessage name="companyName"></ErrorMessage></span>
              <br />
              <label>Location</label>
              <br />
              <Field
                className="add-com-input"
                type="location"
                name="location"
                placeholder="Select location"
              />
              <br />
              <span className="danger"> 
              <ErrorMessage name="location"></ErrorMessage></span>
              <br />
              <label>City</label> <br />
              <Field
                className="add-com-input"
                type="city"
                name="city"
                placeholder="Select City"
              />
              <br />
              <span className="danger"> <ErrorMessage name="city"></ErrorMessage></span>
              <br />
              <label>Founded On</label>
              <br />
              <Field className="add-com-input" type="Date" name="founded" />
              <br />
              <span className="danger"> <ErrorMessage name="founded"></ErrorMessage></span>
              <br />
              <br />
              <input type="file" name="company_logo" onChange={addCompanyPic}/>
              {/* <br/> */}
              <button className="add-btn" type="submit">
                Save
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};


export default CreateCompany;