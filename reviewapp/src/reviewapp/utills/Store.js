import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import AuthSlice from "../features/auth/AuthSlice";
import companySlice from "../features/company/CompanySlice";
import ReviewSlice from "../features/review/ReviewSlice";

const store=configureStore(
    {
        reducer:{
            user:AuthSlice,
            company: companySlice,
            review:ReviewSlice,
        }
    },
    applyMiddleware(thunk)
)
export default store;