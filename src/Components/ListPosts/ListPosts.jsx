import "./ListPosts.scss";
import React from "react";
import Post from "../Post/Post";

export default function ListPosts({ listShowPosts, listPosts, setListPosts }) {
  return (
    <ul className="list-posts">
      {listShowPosts.map((post) => {
        return (
          <Post
            key={post.slug}
            slug={post.slug}
            title={post.title}
            favoritesCount={post.favoritesCount}
            favorited={post.favorited}
            tagList={post.tagList}
            description={post.description}
            userName={post.author.username}
            image={post.author.image}
            dateCreate={new Date(post.createdAt)}
            listPosts={listPosts}
            setListPosts={setListPosts}
          />
        );
      })}
    </ul>
  );
}
