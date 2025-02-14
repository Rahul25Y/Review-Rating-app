import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyDetails } from '../../features/company/CompanySlice';
import Navbar_new from '../../navbar/Navbar_new';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarRating from './StarRating';
import AddNewReview from '../Company/AddNewreview';  
import { Modal } from 'react-bootstrap';
import './CompanyDetails.css';

export default function CompanyDetails() {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  
  const companyData = useSelector((state) => state.company);
  const review_msg = useSelector((state) => state.review.review_msg); 
  // Watch for review submission

  const { company_details } = companyData;
  const { companyDetails, comments } = company_details || {};
  const { companyName, company_logo, city, founded, location } = companyDetails || {};

  const [showModal, setShowModal] = useState(false); 
  // State to control modal visibility

  useEffect(() => {
    dispatch(getCompanyDetails(id)); 
    // Fetch company details on mount
  }, [dispatch, id]);

  useEffect(() => {
    if (review_msg) {
      dispatch(getCompanyDetails(id)); 
      // Refetch company details when a review is added
    }
  }, [review_msg, dispatch, id]);

  return (
    <div className="companylist-container">
      <Navbar_new />
      <div className="container mt-5">
        <div className="row justify-content-center">
          {/* Company Details Section */}
          <div className="col-12 col-md-8 col-lg-7 mb-4 fade-in">
            <div className="card shadow-sm">
              <img
                className="card-img-top img-fluid rounded"
                src={`http://localhost:9000${company_logo}`}
                alt={companyName}
              />
              <div className="card-body">
                <h5 className="card-title">{companyName}</h5>
                <p className="card-text">
                  <strong>Founded:</strong> {founded} <br />
                  <strong>Location:</strong> {location} <br />
                  <strong>City:</strong> {city}
                </p>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  Add Review
                </button>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* Comments Section */}
          <div className="col-12">
            {comments && comments.length > 0 ? (
              <div className="row fade-in">
                {comments.map((value) => (
                  <div key={value._id} className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-start gap-3">
                          <img
                            className="rounded-circle"
                            src={`http://localhost:9000${value.user_id.profilepic}`}
                            alt={value.user_id.name}
                            style={{ width: '50px', height: '50px' }}
                          />
                          <div className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center">
                              <h6 className="mb-0">{value.user_id.name}</h6>
                              <p className="text-muted mb-0">{value.createdAt.slice(0, 10)}</p>
                            </div>
                            <p className='pt-1'>{value.review}</p>
                            <div className="d-flex align-items-center">
                              <strong className="mr-2">Rating:</strong>
                              <span className="c"><StarRating rating={value.rating} /></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Adding Review */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNewReview companyId={id} setShowModal={setShowModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
