import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "../../features/company/CompanySlice";
import Navbar_new from "../../navbar/Navbar_new";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "./Company_list.css";

export default function Company_list() {
  const companies = useSelector((state) => state.company);
  const { company_data } = companies;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <>
      <Navbar_new />
      <div className="container my-3">
        {/* Flexbox for alignment on larger screens */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center my-3 my-md-4 ">
          <h3 className="text-center text-md-start">Total Result:</h3>
          <button className="btn btn-primary mt-2 mt-md-0">
            <Link to="/Create_company" className="text-white text-decoration-none">
              Add Company
            </Link>
          </button>
        </div>
       
        <div className="row">
          {company_data &&
            company_data.map(({ _id, company_logo, companyName, location, city, founded }) => (
              <div key={_id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm p-1 rounded">
                  <Link to={`/CompanyDetails/${_id}`} className="text-decoration-none">
                    <img
                      src={`http://localhost:9000${company_logo}`}
                      className="card-img-top rounded"
                      alt={companyName}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Link>
                  <div className="card-body text-center">
                    <b>
                     CompanyName: {companyName}
                      <br />
                     location :{location}, {city}
                      <br />
                      Founded Date : {founded}
                    </b>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
