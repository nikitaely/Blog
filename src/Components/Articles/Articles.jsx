import "./Articles.scss";
import ListPosts from "../ListPosts/ListPosts";
import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

export default function Articles({listPosts, setListPosts, currentPage, setCurrentPage}) {
  return (
    <div className="articles">
      <ListPosts
        listShowPosts={listPosts.slice(currentPage * 5 - 5, currentPage * 5)}
        listPosts={listPosts}
        setListPosts={setListPosts}
      />
      <Pagination
        current={currentPage}
        total={50}
        align="center"
        onChange={(page) => setCurrentPage(page)}
        className="pagination"
      />
    </div>
  );
}
