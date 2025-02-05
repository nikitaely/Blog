import "./Article.scss";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import deleteArticle from "../../API/deleteArticle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import favoriteArticle from "../../API/favoriteArticle";
import unfavoriteArticle from "../../API/unfavoriteArticle";

export default function Article({
  title,
  favoritesCount,
  favorited,
  tagList,
  description,
  userName,
  image,
  dateCreate,
  body,
  slug,
  listPosts,
  setListPosts,
}) {
  const defaultImage = "./noname.png";
  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(dateCreate);
  const day = dateCreate.getDate();
  const year = dateCreate.getFullYear();

  const { auth, user } = useSelector((state) => ({
    auth: state.auth.auth,
    user: state.auth.user,
  }));

  const navigate = useNavigate();

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
      })
      .catch((error) => {
        console.error("Error updating like status:", error);
      });
  };

  const onDelete = (slug) => {
    setListPosts(listPosts.filter((item) => item.slug !== slug));
    deleteArticle(user.token, slug)
      .then(() => {
        alert("Article delete!");
        navigate("/articles");
      })
      .catch((error) => console.error("Aricle delete error: ", error));
  };

  if (!auth) {
    return (
      <article className="article">
        <div className="article__post">
          <div className="article__info">
            <div className="title_container">
              <h5 className="article__title">{title}</h5>
              <div className="article__likes">
                <button className={"article__likes_button disable"}></button>
                <span className="article__likes_count">{favoritesCount}</span>
              </div>
            </div>
            <ul className="article__tags">
              {tagList.map((tag) => (
                <li className="article__tag">{tag}</li>
              ))}
            </ul>
            <text className="article__description">{description}</text>
          </div>

          <div className="article__author">
            <div className="article__author_container">
              <span className="username">{userName}</span>
              <span className="date_create">{`${month} ${day}, ${year}`}</span>
            </div>
            <img
              className="profile_photo"
              src={image ? image : defaultImage}
              alt="profile photo"
            />
          </div>
        </div>
        <div className="article__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </article>
    );
  }

  return (
    <article className="article">
      <div className="article__post">
        <div className="article__info">
          <div className="title_container">
            <h5 className="article__title">{title}</h5>
            <div className="article__likes">
              <button
                type="button"
                onClick={onLike}
                className={`article__likes_button ${
                  favorited && auth ? "active" : "disable"
                }`}
              ></button>
              <span className="article__likes_count">{favoritesCount}</span>
            </div>
          </div>
          <ul className="article__tags">
            {tagList.map((tag) => (
              <li className="article__tag">{tag}</li>
            ))}
          </ul>
          <text className="article__description">{description}</text>
        </div>
        <div className="article__post_container">
          <div className="article__author">
            <div className="article__author_container">
              <span className="username">{userName}</span>
              <span className="date_create">{`${month} ${day}, ${year}`}</span>
            </div>
            <img
              className="profile_photo"
              src={image ? image : defaultImage}
              alt="profile photo"
            />
          </div>
          <div className="article__buttons">
            <button
              className="article__buttons_delete"
              onClick={() => onDelete(slug)}
            >
              Delete
            </button>
            <Link
              to={`/articles/${slug}/edit`}
              className="article__buttons_edit"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className="article__body">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </article>
  );
}
