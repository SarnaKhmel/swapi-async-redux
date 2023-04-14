import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchRegister, checkAuth } from "../../redux/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    // console.log(values);

    const result = await dispatch(fetchRegister(values));
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
    <div>
      <div> Create Account </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("fullName", { required: true })}
          name="fullName"
          placeholder="Full Name"
        />
        {errors.fullName && <p> fullName is required.</p>}
        <input
          {...register("email", { required: true })}
          type="email"
          name="email"
          placeholder="email"
        />
        {errors.email && <p> Email name is required.</p>}
        <input
          {...register("password", { required: true })}
          type="password"
          name="password"
          placeholder="pass"
        />
        {errors.password && <p> Pass is required.</p>}
        <button type="submit" size="large">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
