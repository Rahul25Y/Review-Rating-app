import React from 'react'
import img from '../../assets/img.png'
import img2 from '../../assets/pr1.jpg';
import img4 from '../../assets/img.png'
import img5 from '../../assets/img.png'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik , Form,Field, ErrorMessage} from 'formik';
import { SignInUser, clearState } from '../../features/auth/AuthSlice';
import * as yup from "yup"
import {toast, ToastContainer} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function Login() {
  const navigate=useNavigate();
  const dispatch = useDispatch();
    const data = useSelector((state) => state.user);
    let { error, message, loading } = data;
  
    useEffect(() => {
      if (error) {
        toast.error(error, { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
          dispatch(clearState())
          navigate('/');
        }, 1000);
      }
      if (message) {
        toast.success(message, { position: toast.POSITION.TOP_CENTER });
        setTimeout(() => {
          dispatch(clearState())
          navigate('/Company_list/')
        }, 1000);
      }
    }, [error, message]);
  
    const initialValue = {
      email: "",
      password: "",
    };
  
    const validationSchema = yup.object().shape({
      email: yup.string().required().email("Please enter your email"),
      password: yup.string().required("Please enter your password"),
    })
  
  
    const handleSubmit = async (values) => {
      console.log("values", values);
      const result = await dispatch(SignInUser(values));
      // if(result.payload.message == "Login success"){
      //   navigate('/Company_list/')
      // }
    }
  
  return (
    <>
      <ToastContainer/>
     <div className="login-container">
        <div className="left-login-wel">
       <h1>Welcome</h1>
          <p>Lorem ipsum dolor sit amet, consectetur <br/>adipiscing elit.</p>
          <img src={img5} className='img-5'></img>
          <br />
           <br />
           <div className="left-login-logo"></div>
         </div>
         <div className="right-login">
           <div className="login-star">
             <h2 className="login-h2">Login</h2>
             <img src={img2} className="login-img"></img>
           </div>
           <p className="login-p">Hello! please enter your details for login</p>

           <Formik
           initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
          <Form className="login-form">
            <Field
              className="login-input"
              type="text"
              name="email"
              placeholder="&#x2709; Email"
            />
            <br />
            <span className="danger"><ErrorMessage name="email"></ErrorMessage></span>
            <br/>
            <Field
              className="login-input"
              type="password"
              name="password"
              placeholder="&#128274; Password"
            />
            <br/>
            <span className="danger"><ErrorMessage name="password"></ErrorMessage></span>
            <br/>
          
          <p className="login-p1">
            <Link to="ForgetPassword">Forget Password? </Link>
          </p>
          <button className="login-btn" type="submit">Login</button>
          </Form>
          </Formik>
          <hr className='hr-login'/>
          <p className="login-p2">I don't have an account on Review & Rate</p>
          <Link className="login-register" to="signup">
            Register Now
          </Link>
        </div>
      </div>
    </>
    // <Formik 
    //  initialValue={initialValue}
    //        validationSchema ={validationSchema}
    //        onSubmit={handleSubmit}>
           
    // <Form>
    //  <div className='Login1'>
    //  <div className='Login2'>
    //   <div className='left-box'>
    //     <h1 id='w-l'>WelCome</h1>
    //     <p id='p-p'>
    //      Lorem ipsum dolor sit amet , consectetur<br/>
    //       adipidcing elit.
    //     </p>
    //     <img src={img} className='img-1'></img>
    //   </div>
    //   <div className='Right-box'>
    //     <div className='right-box-A'>
       
    //     <img src={img2} className='img-2'></img>
    //     <h1 className='login-t'>Login</h1>
    //     <p  className='login-t1'>Hello! Please enter your details for login</p>
    //     {/* <input type="text" placeholder="✉️ Email" id='input-box'></input>  */}
    //     <Field type="text" name='email' placeholder="✉️ Email" id='input-box'></Field>
    //     {/* <input type="password" placeholder="🔒 Password" id='input-box'></input> */}
    //     <Field type="password" name='password' placeholder="🔒 Password" id='input-box'></Field>
    //     <h3 id='f-p'><Link to='/ResetPassword'>Forget Password ?</Link></h3>
    //     <button id='btn'>Login</button>
    //     <hr id='h-r'/>
    //     <p>I don't have an account on Review & Rating</p>
    //      <Link to='/Signup' className='a-h'>Register Now</Link>
    //     </div>
    //   </div>
    // </div>
    // </div>
    // </Form>
    // </Formik>

  )
}

// import React, { useEffect } from "react";
// import "./Login.css";
// import star from "../../assets/img.png";
// import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as yup from "yup"
// import { SignInUser } from "../../features/auth/AuthSlice";
// import { useDispatch, useSelector } from "react-redux";
// import "react-toastify/dist/ReactToastify.css";
// export const Login = () => {
//   // const navigate = useNavigate()
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.user);
//   let { error, message, loading } = data;

//   useEffect(() => {
//     if (error) {
//       toast.error(error, { position: toast.POSITION.TOP_CENTER });
//     }
//     if (message) {
//       toast.success(message, { position: toast.POSITION.TOP_CENTER });
//     }
//   }, [error, message]);

//   const initialState = {
//     email: "",
//     password: "",
//   };

//   const validationSchema = yup.object().shape({
//     email: yup.string().required().email("Please enter your email"),
//     password: yup.string().required("Please enter your password"),
//   })


//   const handleSubmit = async (values) => {
//     // console.log("values", values);
//     const result = await dispatch(SignInUser(values));
//     // if(result.payload.message == "Login success"){
//     //   navigate()
//     // }
//   }
//   return (
//     <>
//     <ToastContainer/>
//       <div className="login-container">
//         <div className="left-login-wel">
//           <h1>Welcome</h1>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//           <br />
//           <br />
//           <div className="left-login-logo"></div>
//         </div>
//         <div className="right-login">
//           <div className="login-star">
//             <h2 className="login-h2">Login</h2>
//             <img src={star} className="login-img"></img>
//           </div>
//           <p className="login-p">Hello! please enter your details for login</p>

//           <Formik
//            initialValues={initialState}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//             >
//           <Form className="login-form">
//             <Field
//               className="login-input"
//               type="text"
//               name="email"
//               placeholder="&#x2709; Email"
//             />
//             <br />
//             <ErrorMessage name="email"></ErrorMessage>
//             <br/>
//             <Field
//               className="login-input"
//               type="password"
//               name="password"
//               placeholder="&#128274; Password"
//             />
//             <br/>
//             <ErrorMessage name="password"></ErrorMessage>
//             <br/>
          
//           <p className="login-p1">
//             <Link to="reset">Reset Password? </Link>
//           </p>
//           <button className="login-btn" type="submit">Login</button>
//           </Form>
//           </Formik>
//           <hr />
//           <p className="login-p2">I don't have an account on Review & Rate</p>
//           <Link className="login-register" to="signup">
//             Register Now
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };