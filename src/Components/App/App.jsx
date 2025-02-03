import "./App.scss";
import Articles from "../Articles/Articles";
import Article from "../Article/Article";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SingnIn/SignIn";
import getArticles from "../../API/getArticles";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import CreateArticle from "../CreateArticle/CreateArticle";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../store/authActions";
import EditArticle from "../EditArticle/EditArticle";

export default function App() {
  const [listPosts, setListPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("auth");

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
      dispatch(setAuth(storedAuth === "true"));
    }

    getArticles()
      .then((data) => {
        setListPosts(data.articles);
      })
      .catch((error) => {
        console.error("Failed to fetch articles:", error);
        setError("Failed to load articles. Please try again later.");
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        {error && <div className="error">{error}</div>}
        <Routes>
          {["/", "/articles"].map((path) => (
            <Route
              key={path}
              path={path}
              exact
              element={
                listPosts.length === 0 ? (
                  <div>Loading...</div>
                ) : (
                  <Articles
                    listPosts={listPosts}
                    setListPosts={setListPosts}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )
              }
            />
          ))}
          <Route
            path="/articles/:slug"
            element={<ArticleWrapper listPosts={listPosts} setListPosts={setListPosts}/>}
          />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<CreateArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticle listPosts={listPosts}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

const ArticleWrapper = ({ listPosts, setListPosts }) => {
  const { slug } = useParams();
  const post = listPosts.find((item) => item.slug === slug);

  if (!post) {
    return <div>Article not found</div>;
  }

  return (
    <Article
      title={post.title}
      likesCount={post.favoritesCount}
      tagList={post.tagList}
      description={post.description}
      userName={post.author.username}
      image={post.author.image}
      dateCreate={new Date(post.createdAt)}
      body={post.body}
      listPosts={listPosts}
      setListPosts={setListPosts}
      slug={slug}
    />
  );
};
