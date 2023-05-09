
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import AddressList from "./components/address/addressList";
import CreateAddress from "./components/address/createAddress";
import EditAddress from "./components/address/editAddress";
import ShowAddress from "./components/address/showAddress";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path="/address/list"
            element={<RequiredAuth child={<AddressList />} />}
          />
          <Route
            path="/address/create"
            element={<RequiredAuth child={<CreateAddress />} />}
          />
          <Route
            path="/address/show/:id"
            element={<RequiredAuth child={<ShowAddress />} />}
          />
          <Route
            path="/address/edit/:id"
            element={<RequiredAuth child={<EditAddress />} />}
          />

        </Routes>
      </Router>
    </React.Fragment>
  );
}

//checking if the user trying to access the routes is authenticated
const RequiredAuth = ({ child }) => {
  // Logout if token is not available 
  const token = Cookies.get('access_token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return child;
}