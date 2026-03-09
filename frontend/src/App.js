import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";

const PrivateRoute = ({ children }) => {
 const token = localStorage.getItem("token");

 return token ? children : <Navigate to="/" />;
};

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route
     path="/dashboard"
     element={
      <PrivateRoute>
       <Dashboard />
      </PrivateRoute>
     }
    />

   </Routes>

  </BrowserRouter>

 );

}

export default App;