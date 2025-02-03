import "./Post.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import favoriteArticle from "../../API/favoriteArticle";
import unfavoriteArticle from "../../API/unfavoriteArticle";
import { useSelector } from "react-redux";

export default function Post({
  title,
  favoritesCount,
  favorited,
  tagList,
  description,
  userName,
  image,
  dateCreate,
  slug,
  listPosts,
  setListPosts,
}) {
  const defaultImage = "../../public/noname.png";
  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(dateCreate);
  const day = dateCreate.getDate();
  const year = dateCreate.getFullYear();

  const { auth, user } = useSelector((state) => ({
    auth: state.auth.auth,
    user: state.auth.user,
  }));

  const [like, setLike] = useState(favorited);

  const onLike = () => {
    if (!auth) {
      console.error("User not authenticated");
      return;
    }

    const updatedListPosts = [...listPosts];

    const index = listPosts.findIndex((article) => article.slug === slug);
    if (index !== -1) {
      updatedListPosts[index] = {
        ...updatedListPosts[index],
        favorited: !updatedListPosts[index].favorited,
        favoritesCount: updatedListPosts[index].favorited
          ? favoritesCount - 1
          : favoritesCount + 1, // Update favorites count accordingly
      };
    }
    
    setListPosts(updatedListPosts);

    const action = favorited ? unfavoriteArticle : favoriteArticle;
    action(user.token, slug)
      .then((response) => {
        console.log(response);
        setLike(!like);
      })
      .catch((error) => {
        console.error("Error updating like status:", error);
      });
  };

  return (
    <li className="post">
      <div className="post__info">
        <div className="title_container">
          <Link to={`/articles/${slug}`} className="post__title">
            {title}
          </Link>
          <div className="post__likes">
            <button
              className={`post__likes_button ${like ? "active" : "disable"}`}
              type="button"
              onClick={onLike}
            ></button>
            <span className="post__likes_count">{favoritesCount}</span>
          </div>
        </div>
        <ul className="post__tags">
          {tagList.map((tag) => (
            <li key={tag} className="post__tag">
              {tag}
            </li>
          ))}
        </ul>
        <p className="post__description">{description}</p>
      </div>

      <div className="post__author">
        <div className="post__author_container">
          <span className="username">{userName}</span>
          <span className="date_create">{`${month} ${day}, ${year}`}</span>
        </div>
        <img
          className="profile_photo"
          src={image || defaultImage}
          alt="profile photo"
        />
      </div>
    </li>
  );
}
