import React, { useEffect } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { companyReview, clearState } from '../../features/review/ReviewSlice';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

export default function AddNewReview({ companyId, setShowModal }) {
  const dispatch = useDispatch();
  const reviewState = useSelector((state) => state.review);
  
  const { review_msg, error } = reviewState;
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (review_msg) {
      toast.success(review_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        setShowModal(false);
      }, 1000);
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [review_msg, error, dispatch, setShowModal]);

  const initialState = {
    subject: "",
    review: "",
    rating: ""
  };

  const validationSchema = yup.object().shape({
    subject: yup.string().required("Please enter a subject"),
    review: yup.string().required("Please enter a description"),
    rating: yup.number().min(1).max(5).required("Please enter a rating (1-5)"),
  });

  function handleSubmit(values) {
    let obj = {
      ...values,
      company_id: companyId,
      user_id: user._id,
    };
    dispatch(companyReview(obj));
  }

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center vh-50">
        <div className="card shadow-lg p-3" style={{ width: "100%", maxWidth: "500px" }}>
          <h4 className="text-center mb-3">Add Review</h4>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <Field className="form-control" type="text" name="subject" placeholder="Enter Subject" />
                <ErrorMessage name="subject" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Review</label>
                <Field className="form-control" as="textarea" name="review" placeholder="Enter Review" rows="3" />
                <ErrorMessage name="review" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label">Rating (1-5)</label>
                <Field className="form-control" type="number" name="rating" placeholder="Enter Rating" min="1" max="5" />
                <ErrorMessage name="rating" component="div" className="text-danger small" />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Review
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
