import React from "react";
import "./Profile.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import updateUser from "../../API/updateUser";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/authActions";

export default function Profile() {
  const dispatch = useDispatch();

  const { auth, user } = useSelector((state) => ({
    auth: state.auth.auth,
    user: state.auth.user,
  }))

  const navigate = useNavigate();

  if (!auth) {
    navigate("/sign-in");
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("onSubmit data:", data);
    const { username, email, bio, image } = data;
    updateUser(user.token, username, email, bio, image)
      .then((response) => {
        dispatch(setUser({ ...user, ...response.user }))
        // alert("Edit profile successfully!");
      })
      .catch((error) => {
        console.error("Error edit profile:", error);
        alert("Edit profile failed. Please try again.");
      });
  };

  const password = watch("password");

  //   const atLeastOneFieldRequired = (value) => {
  //     const { username, email, password, image } = value;

  //     if (username || email || password || image) {
  //       return true;
  //     }
  //     return "At least one field must be filled";
  //   }

  return (
    <div className="signup">
      <h2 className="signup__title">Edit Profile</h2>
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
            New Password
            <input
              className={
                "signup__form_item_input" +
                (errors.password ? " error_input" : "")
              }
              type="password"
              placeholder="New Password"
              {...register("password", {
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
            Avatar image (url)
            <input
              className={
                "signup__form_item_input" + (errors.image ? " error_input" : "")
              }
              type="url"
              placeholder="Avatar image"
              {...register("image", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i,
                  message: "Invalid url",
                },
              })}
            />
            {errors.image && (
              <p className="error_message">{errors.image.message}</p>
            )}
          </label>
        </div>

        <div className="signup__submit">
          <button type="submit" className="signup__submit_button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
