import "./SignUp.scss";
import React from "react";
import { Link } from "react-router-dom";
import registerUser from "../../API/retgisterUser";
import { useForm } from "react-hook-form";



export default function SignUp() {

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    const { username, email, password } = data;

    registerUser(username, email, password)
      .then((response) => {
        console.log('Sign Up response: ', response)
        alert("User registered successfully!");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        alert("Registration failed. Please try again.");
      });
  };

  const password = watch("password");

  return (
    <div className="signup">
      <h2 className="signup__title">Create new account</h2>
      <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signup__data">
          <label className="signup__form_item">
            Username
            <input
              className={
                "signup__form_item_input" +
                (errors.username ? " error_input" : "")
              }
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Username must not exceed 20 characters",
                },
              })}
            />
            {errors.username && (
              <p className="error_message">{errors.username.message}</p>
            )}
          </label>
          <label className="signup__form_item">
            Email address
            <input
              className={
                "signup__form_item_input" + (errors.email ? " error_input" : "")
              }
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="error_message">{errors.email.message}</p>
            )}
          </label>
          <label className="signup__form_item">
            Password
            <input
              className={
                "signup__form_item_input" +
                (errors.password ? " error_input" : "")
              }
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 40,
                  message: "Password must not exceed 40 characters",
                },
              })}
            />
            {errors.password && (
              <p className="error_message">{errors.password.message}</p>
            )}
          </label>
          <label className="signup__form_item">
            Repeat Password
            <input
              className={
                "signup__form_item_input" +
                (errors.repeatPassword ? " error_input" : "")
              }
              type="password"
              placeholder="Repeat Password"
              {...register("repeatPassword", {
                required: "Repeat Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.repeatPassword && (
              <p className="error_message">{errors.repeatPassword.message}</p>
            )}
          </label>
        </div>

        <div className="signup__checkbox">
          <div className="signup__checkbox_container">
            <input
              className={errors.agreeToTerms ? "error_input" : ""}
              type="checkbox"
              id="signup_checkbox"
              {...register("agreeToTerms", {
                required: "You must agree to the terms",
              })}
            />
            <label className="signup__confirm" htmlFor="signup_checkbox">
              I agree to the processing of my personal information
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="error_message">{errors.agreeToTerms.message}</p>
          )}
        </div>

        <div className="signup__submit">
          <button type="submit" className="signup__submit_button">
            Create
          </button>
          <span className="signup__submit_description">
            Already have an account? <Link to="/sign-in">Sign In.</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
