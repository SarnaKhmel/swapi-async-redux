import React from "react";
import { NavLink } from "react-router-dom";
import { logout, checkAuth } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkAuth);

  const hadleClick = () => {
    if (window.confirm("Are you sure you want to Logout")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      return <Navigate to="/" />;
    }
  };

  return (
    <div className="navTopBar">
      {isAuth ? (
        <>
          <NavLink className="a" to="/">
            Home
          </NavLink>
          <NavLink className="a" to="/me">
            Me
          </NavLink>
          <NavLink className="a" to="/swapi">
            Swapi
          </NavLink>
          <button onClick={hadleClick}>Logout</button>
        </>
      ) : (
        <>
          <NavLink className="a" to="/">
            Home
          </NavLink>
          <NavLink className="a" to="auth/register">
            Register
          </NavLink>
          <NavLink className="a" to="auth/login">
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Header;
