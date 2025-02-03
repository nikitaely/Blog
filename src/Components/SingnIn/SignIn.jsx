import "./SignIn.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signInUser from "../../API/signInUser";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setUser } from "../../store/authActions";



export default function SignIn() {
  const dispatch = useDispatch();

  const { auth, user } = useSelector((state) => ({
    auth: state.auth.auth,
    user: state.auth.user,
  }))

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password)
      .then((response) => {
        dispatch(setAuth(true))

        const userData = { ...user, ...response.user };
        dispatch(setUser(userData))

        // Сохранение данных пользователя в localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("auth", true);

        navigate("/articles");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        console.log("Authorization failed. Please try again.");
      });
  };

  return (
    <div className="signin">
      <h2 className="signin__title">Sign In</h2>
      <form className="signin__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="signin__data">
          <label className="signin__form_item">
            Email address
            <input
              type="email"
              placeholder="Email address"
              className={
                "signup__form_item_input" + (errors.email ? " error_input" : "")
              }
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            ></input>
            {errors.email && (
              <p className="error_message">{errors.email.message}</p>
            )}
          </label>
          <label className="signin__form_item">
            Password
            <input
              type="password"
              placeholder="Password"
              className={
                "signup__form_item_input" +
                (errors.password ? " error_input" : "")
              }
              {...register("password", { required: "Password is required" })}
            ></input>
            {errors.password && (
              <p className="error_message">{errors.password.message}</p>
            )}
          </label>
        </div>

        <div className="signin__submit">
          <button type="submit" className="signin__submit_button">
            Login
          </button>
          <span className="signin__submit_description">
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </span>
        </div>
      </form>
    </div>
  );
}
