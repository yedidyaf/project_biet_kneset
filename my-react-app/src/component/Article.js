import React from "react";
import Gallery from "./Gallery";
import { format } from 'date-fns';
import "../assets/css/Article.css";

const Article = ({ article, onClose, deleteArtical }) => {
  const { id, date, title, content, author, images } = article;

  return (
    <div className="article">
      <div className="images">
        <Gallery images={images} />
      </div>

      <div className="content">

        <h1 className="title">{title}</h1>


        {date && (
          <div className="date">{format(date, 'dd-MM-yyyy')}</div>
        )}

        {author && (
          <div className="author"> {author}</div>
        )}

        <div className="text">{content}</div>

        {deleteArtical &&
          <button
            className="delete-button"
            onClick={() => deleteArtical(id)}>
            מחק כתבה
          </button>}


        {date && author &&
          <button className="close-button"
            onClick={onClose}>
            סגור
          </button>}

      </div>

    </div>
  );
};

export default Article;