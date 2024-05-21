
import React from 'react'
import './ResetPassword.css';
import img2 from '../../assets/pr1.jpg';
import { Formik ,Form, Field, ErrorMessage} from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../features/auth/AuthSlice';
 import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
 const dispatch=useDispatch();
 const navigate= useNavigate();
 const forgetDData=useSelector((state)=> state.user);

 const {error,forget_message}=forgetDData;

 
  const initialValue = {
    email: "",

  };


  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
    
  })
   
  const handleSubmit = async (values) => {
    // console.log("value",values);
    dispatch(forgetPassword(values));
  };

  return (
    <Formik
      initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
    <Form>
    <div className='ResetPassword'>
    <div className='Reset-password-box'>
    <div className='Reset-box'>
    <h2>Reset Password</h2>
    <img src={img2} className='star-img'></img>
   
    <h6>
    <Field type='email' name='email' placeholder=' &#128231; Enter Your Email' ></Field>
    <br/>
    <ErrorMessage name='email'></ErrorMessage>
    </h6>
    <button className='reset-btn'>Forget</button>
    </div>
    </div>
     
    </div>
    </Form>
    </Formik>
  )
}

