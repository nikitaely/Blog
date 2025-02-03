import "./Article.scss";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import deleteArticle from "../../API/deleteArticle";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Article({
  title,
  likesCount,
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
                <button className={"article__likes_button "}></button>
                <span className="article__likes_count">{likesCount}</span>
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
              <button className="article__likes_button"></button>
              <span className="article__likes_count">{likesCount}</span>
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
