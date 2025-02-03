import { React, useState } from "react";
import "./CreateArticle.scss";
import { useForm } from "react-hook-form";
import Tag from "../Tag/Tag";
import { useNavigate } from "react-router-dom";
import createArticle from "../../API/createArticle";
import { useSelector, useDispatch } from "react-redux";

export default function CreateArticle() {

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
    formState: { errors },
  } = useForm();

  const [tagList, setTagList] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    if (newTag) {
      if (!tagList.includes(newTag)) {
        setTagList([...tagList, newTag]);
      } else {
        alert("Tag already exists!");
      }
    }
    setNewTag("");
    console.log(tagList);
  };

  const deleteTag = (value) => {
    console.log("Deleting tag:", value);
    setTagList(tagList.filter((tag) => tag !== value));
  };

  const onSubmit = (data) => {
    const { title, description, text } = data;
    const token = user.token;
    console.log("Create article token:", token);
    createArticle(token, title, description, text, tagList)
      .then((response) => {
        console.log("Create article response: ", response);
        alert("Create article successfully!");
        navigate('/articles')
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error create article:", error);
        alert("Registration failed. Please try again.");
      });
  };

  return (
    <article className="new-article">
      <h1 className="new-article__title">Create new article</h1>
      <form className="new-article__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="new-article__form_item">
          Title
          <input
            className="new-article__form_item_input"
            type="text"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <p className="error_message">{errors.title.message}</p>
          )}
        </label>
        <label className="new-article__form_item">
          Short description
          <input
            className="new-article__form_item_input"
            type="text"
            placeholder="Short description"
            {...register("description", {
              required: "Short description is required",
            })}
          />
          {errors.description && (
            <p className="error_message">{errors.description.message}</p>
          )}
        </label>
        <label className="new-article__form_item">
          Text
          <textarea
            className="new-article__form_item_input text"
            type="text"
            placeholder="Text"
            {...register("text", {
              required: "Text is required",
            })}
          />
          {errors.text && (
            <p className="error_message">{errors.text.message}</p>
          )}
        </label>

        <div className="new-article__form_item tags">
          Tags
          <div className="new-article__form_tags_container">
            {tagList.map((tag) => (
              <Tag key={tag} tag={tag} onDelete={() => deleteTag(tag)} />
            ))}
            <div className="new-article__form_tags_container_tag">
              <input
                className="new-article__form_item_input tag"
                placeholder="Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button type="button" className="new-article__form_tags_delete">
                Delete
              </button>
              <button
                type="button"
                className="new-article__form_tags_add"
                onClick={addTag}
              >
                Add tag
              </button>
            </div>
          </div>
        </div>
        <button className="new-article__form_submit" type="submit">
          Send
        </button>
      </form>
    </article>
  );
}
