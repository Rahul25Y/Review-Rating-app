
 import img from "../../assets/pr1.jpg";
 import img3 from '../../assets/img.png'
 import img2 from "../../assets/pr1.jpg";
import "./Signup.css";
import React, { useEffect, useState } from "react";
// import img from "../../assets/bg3.jpg";
import { Link } from "react-router-dom";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser } from "../../features/auth/AuthSlice";
import { clearState } from "../../features/auth/AuthSlice";


export default function Signup() {
  const dispatch = useDispatch();
  const data = useSelector((state)=> state.user);
  let {error,message,loading} = data;
  useEffect(()=>{
    if (error) {
      toast.error(error,{position: toast.POSITION.TOP_CENTER});
    }
    if (message) {
      toast.success(message,{position: toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
      },500)
    }
  },[error,message]);
  
  const [pic, setPic] = useState("");

  const initialstate = {
    name: "",
    email: "",
    number: "",
    city: "",
    StateName:"",
    password: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("please enter your name "),
    email: yup.string().required().email("please enter your email "),
    number: yup.string().required("please enter your number"),
    city: yup.string().required("please enter your city "),
    StateName: yup.string().required("please enter your State "),
    password: yup.string().required("please enter your password"),
  });

  // const handleSubmit = () => {};
  function picselect(e) {
    setPic(e.target.files[0]);
  }

  function handleSubmit(values){
   let obj = {
    profilepic: pic,
    ...values,
   };
   console.log("this is image",obj);
   dispatch(SignUpUser(obj));

  }
  return (
    <div>
    <ToastContainer/>
      <div className="signup-container">
        <div className="left-signup-wel">
          <h1>Welcome</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit.
          </p>
          <br />
          <img src={img3} className='img-3'></img>
          <br />
          <div className="left-signup-logo"></div>
        </div>
        <div className="right-signup">
          <div className="signup-star">
            <h2 className="signup-h2">Sign up</h2>
            <img src={img} className="signup-img"></img>
          </div>
          <br />
          <Formik
            initialValues={initialstate}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="signup-form">
              <Field
                className="signup-input"
                type="text"
                name="name"
                placeholder="&#128110; Full Name"
              ></Field>
              <br />
            <span className="tost-error-msg"><ErrorMessage name="name"></ErrorMessage></span>
            <br/>
              <Field
                className="signup-input"
                name="email"
                type="email"
                placeholder="&#x2709; Email ID"
              ></Field>
              <br />
              <span className="tost-error-msg"><ErrorMessage name="email"></ErrorMessage></span>
              <br/>
              <Field
                className="signup-input"
                name="number"
                type="text"
                placeholder="📞 Phone Number"
              ></Field>
              <br />
              <span className="tost-error-msg"><ErrorMessage name="number"></ErrorMessage></span>
              <br/>
              <Field
                className="signup-input"
                name="city"
                type="city"
                placeholder="City"
              ></Field>
              <br />
              <span className="tost-error-msg"> <ErrorMessage name="city"></ErrorMessage></span>
              <br/>
              <Field
                className="signup-input"
                name="StateName"
                type="text"
                placeholder=" &#x2709; State"
              ></Field>
              <br />
              <span className="tost-error-msg"> <ErrorMessage name="StateName"></ErrorMessage></span>
              <br/>
              <Field
                className="signup-input"
                name="password"
                type="password"
                placeholder="password"
              ></Field><br/>
             <span className="tost-error-msg"><ErrorMessage name="password"></ErrorMessage></span>
             <br/>
              <input type="file" onChange={picselect} className="file-pic"></input>
              <br/>
              <button className="signup-btn">Sign Up</button>
              <hr className="h-r-r"/>
              <p className="signup-p1">
                I already have an account <Link to="/">Login</Link>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}