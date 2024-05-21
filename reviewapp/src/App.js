import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../src/reviewapp/Component/auth/Login';
import Signup from '../src/reviewapp/Component/auth/Signup';
import Page404 from '../src/reviewapp/Component/protected/Page404'
import ResetPassword from './reviewapp/Component/auth/ResetPassword';
import { CreateCompany } from './reviewapp/Component/Company/CreateComany';
import Company_list from './reviewapp/Component/Company/Company_list';
import AddNewreview from './reviewapp/Component/Company/AddNewreview';
import CompanyDetails from './reviewapp/Component/Company/CompanyDetails'
import Protected_route from './reviewapp/Component/protected/Protected_route';
import Navbar_new from './reviewapp/navbar/Navbar_new';
import ForgetPassword from './reviewapp/Component/auth/ForgetPassword';

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
       
        <Route path='/ForgetPassword' element={<ForgetPassword/>}></Route>
        <Route path='/Company_list' element={<Protected_route Component={Company_list}/>}></Route>
        <Route path='/Create_company' element={<CreateCompany/>}></Route>
        <Route path='/companyDetails/:id' element={<CompanyDetails/>}></Route>
       <Route path='/AddNewreview/:id' element={<AddNewreview/>}></Route>
       <Route path='/Navbar' element={<Protected_route Component={Navbar_new}/>}></Route>
       <Route path='/user/reset-password/:id' element={<ResetPassword/>}></Route>
       <Route path='/*' element={<Page404/>}></Route>
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;

