import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from '../../store/authActions';

export default function Header() {


  const dispatch = useDispatch()

  const { auth, user } = useSelector((state) => ({
      auth: state.auth.auth,
      user: state.auth.user,
    }))


  if (auth) {
    const username = user.username;
    const defaultImage = "./profile.png";
    const image = user.image;

    return (
      <header className="header">
        <Link to="/articles" className="header__title">
          Realworld Blog
        </Link>
        <div className="header__buttons">
          <Link to="/new-article" className="header__buttons_new-article">
            Create article
          </Link>
          <Link to="/profile" className="header__profile">
            <span className="header__profile_username">{username}</span>
            <img
              className="header__profile_image"
              src={image ? image : defaultImage}
            />
          </Link>
          <button
            className="header__buttons_logout sign"
            onClick={() => dispatch(setAuth(false))}
          >
            Log Out
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <Link to="/articles" className="header__title">
        Realworld Blog
      </Link>
      <div className="header__buttons">
        <Link to="/sign-in" className="header__buttons_signin sign">
          Sign In
        </Link>
        <Link to="/sign-up" className="header__buttons_signup sign">
          Sign Up
        </Link>
      </div>
    </header>
  );
}
