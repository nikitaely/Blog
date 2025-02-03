import { React, useEffect, useState } from "react";
import "./EditArticle.scss";
import { useForm } from "react-hook-form";
import Tag from "../Tag/Tag";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import editArticle from "../../API/editArticle";

export default function EditArticle({ listPosts }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Selectors
  const { auth, user } = useSelector((state) => ({
    auth: state.auth.auth,
    user: state.auth.user,
  }));

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // State variables for tags
  const [newTag, setNewTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [articleFound, setArticleFound] = useState(false);

  // Check if article exists
  useEffect(() => {
    const article = listPosts.find((item) => item.slug === slug);
    if (article) {
      setTagList(article.tagList);
      reset({
        title: article.title,
        description: article.description,
        text: article.body,
      }); // Reset form values
      setArticleFound(true);
    } else {
      setArticleFound(false);
    }
  }, [listPosts, slug, reset]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      navigate("/sign-in");
    }
  }, [auth, navigate]);

  // Tag management functions
  const addTag = (e) => {
    e.preventDefault();
    if (newTag && !tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
      setNewTag("");
    } else if (tagList.includes(newTag)) {
      alert("Tag already exists!");
    }
  };

  const deleteTag = (value) => {
    setTagList(tagList.filter((tag) => tag !== value));
  };

  // Form submission
  const onSubmit = (data) => {
    const { title, description, text } = data;
    const token = user.token;

    editArticle(token, title, description, text, slug)
      .then(() => {
        alert("Article updated successfully!");
        navigate(`/articles/${slug}`);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating article:", error);
        alert("Update failed. Please try again.");
      });
  };

  if (!articleFound) {
    return <div>Article not found</div>;
  }

  return (
    <article className="new-article">
      <h1 className="new-article__title">Edit article</h1>
      <form className="new-article__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="new-article__form_item">
          Title
          <input
            className="new-article__form_item_input"
            type="text"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
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
            placeholder="Text"
            {...register("text", { required: "Text is required" })}
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
