import React, { useEffect } from 'react'
import { Field, Formik,Form } from 'formik';
import { ErrorMessage } from 'formik';
import './AddNewreview.css';
import * as yup from "yup"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { companyReview,clearState } from '../../features/review/ReviewSlice';
import { toast ,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddNewreview() {

  const navigate = useNavigate();
  const param = useParams();
  const {id} = param;

  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const review = useSelector((state)=> state.review);
  // console.log("review",review);
  const {review_msg, loading,error}= review;

  useEffect(() =>{
    if(review_msg){
      toast.success(review_msg,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate(`/companyDetails/${id}`);
      },1000);
    }
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER});
    }
  },[review_msg,error]);

  const initialState={
    subject:"",
    review:"",
    rating:""
  }
  const validationSchema=yup.object().shape({
    subject:yup.string().required("please enter your subject"),
    review:yup.string().required("please enter your description"),
    rating:yup.string().required("please enter your rating"),

  })
  function handleSubmit(values){
   console.log("Values",values);
   let obj={
    ...values,
    company_id:id,
    user_id:user._id,
   };
   dispatch(companyReview(obj));
  };

  return (
    <>
    <ToastContainer/>
      <div className="add-rev-container">
        <div className="add-reviewR">
         <h1 className="add-rev-h1">Add Review</h1>
         <br />
        <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="add-review-form">
              <Field
                className="add-rev-input1"
                type="text"
                name="subject"
                placeholder="Enter Subject"
              />
              <br />
              <ErrorMessage name="subject"></ErrorMessage>
              <br />
              <Field
                className="add-rev-input1"
                type="text"
                name="review"
                placeholder="Enter review"
              />
              <br />
              <ErrorMessage name="review"></ErrorMessage>

              <br />
            
              <Field
                className="add-rev-input1"
                type="text"
                 name="rating"
                placeholder="Enter rating"
              />
              <br />
              <ErrorMessage name="rating"></ErrorMessage>
              <button className="review-btn" type="submit">
               Save
              </button>
              <br />
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}


// import React from "react";
// import "./AddNewReview.css";
// import * as yup from "yup";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// export const AddNewReview = () => {
//   const initialState = {
//     subject: "",
//     description: "",
//     rating: "",
//   };

//   const validationSchema = yup.object().shape({
//     subject: yup.string().required("Please enter your subject"),
//     description: yup.string().required("Please enter description"),
//     rating: yup.string().required("Please enter rating"),
//   });

//   function handleSubmit(values) {
//     console.log("Values", values);
//   }
//   return (
//     <>
//       <div className="add-rev-container">
//         <div className="add-review">
//           <h1 className="add-rev-h1">Add Review</h1>
//           <br />
//           <Formik
//             initialValues={initialState}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             <Form className="add-review-form">
//               <Field
//                 className="add-rev-input1"
//                 type="text"
//                 name="subject"
//                 placeholder="Enter Subject"
//               />
//               <br />
//               <ErrorMessage name="subject"></ErrorMessage>
//               <br />
//               <Field
//                 className="add-rev-input1"
//                 type="text"
//                 name="description"
//                 placeholder="Description"
//               />
//               <br />
//               <ErrorMessage name="description"></ErrorMessage>

//               <br />
//               <Field
//                 type="text"
//                 name="rating"
//                 className="add-rev-input1"
//                 placeholder="Enter Rating"
//               />
//               <br />
//               <ErrorMessage name="rating"></ErrorMessage>
//               <button className="review-btn" type="submit">
//                 Save
//               </button>
//               <br />
//             </Form>
//           </Formik>
//         </div>
//       </div>
//     </>
//   );
// };