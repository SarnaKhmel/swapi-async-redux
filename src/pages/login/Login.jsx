import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, checkAuth } from "../../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    const result = await dispatch(fetchAuth(values));
    console.log(result.payload);
    if (!result.payload) {
      return alert("Error register");
    }
    if ("token" in result.payload) {
      window.localStorage.setItem("token", result.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <input
          {...register("email", { required: true })}
          name="email"
          placeholder="Email"
        />
        <input
          {...register("password", { required: true })}
          name="password"
          placeholder="password"
        />
      </label>
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
