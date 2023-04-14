import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Swapi from "../pages/Swapi";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Me from "../pages/me/Me.jsx";

import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, checkAuth } from "../redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const ProtectedRoute = ({ component, redirectPath = "/login" }) => {
    const isAuth = useSelector(checkAuth);
    return isAuth ? component : <Navigate to={redirectPath} />;
  };
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/me" element={<ProtectedRoute component={<Me />} />} />
        <Route
          path="/swapi"
          element={<ProtectedRoute component={<Swapi />} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
