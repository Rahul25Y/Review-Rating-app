import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, clearState } from "../../features/company/CompanySlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const CreateCompany = () => {
  const [pic, setPic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companyData = useSelector((state) => state.company) || {};
  let { error, cmpcreate_msg } = companyData;

  useEffect(() => {
    if (cmpcreate_msg) {
      toast.success(cmpcreate_msg, { position: toast.POSITION.TOP_CENTER });
      setTimeout(() => {
        dispatch(clearState());
        navigate('/Company_list');
      }, 1000);
    }
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  }, [cmpcreate_msg, error, dispatch, navigate]);

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
    const user = JSON.parse(localStorage.getItem("user"));

    let obj = {
      ...values,
      company_logo: pic,
      userId: user._id,
    };

    dispatch(createCompany(obj));
  }

  function addCompanyPic(e) {
    setPic(e.target.files[0]);
  }

  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4">
              <h2 className="text-center text-primary">Add Company</h2>
              <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form className="mt-3">
                  <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <Field className="form-control" type="text" name="companyName" placeholder="Enter..." />
                    <ErrorMessage name="companyName" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <Field className="form-control" type="text" name="location" placeholder="Select location" />
                    <ErrorMessage name="location" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <Field className="form-control" type="text" name="city" placeholder="Select City" />
                    <ErrorMessage name="city" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Founded On</label>
                    <Field className="form-control" type="date" name="founded" />
                    <ErrorMessage name="founded" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Company Logo</label>
                    <input className="form-control" type="file" name="company_logo" onChange={addCompanyPic} />
                  </div>

                  <button className="btn btn-primary w-100" type="submit">
                    Save
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
