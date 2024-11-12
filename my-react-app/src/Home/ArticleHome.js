import React from "react";
import { format } from 'date-fns';
import "../assets/css/Article.css";
// import Gallery from "../component/Gallery";
// import ImageSlider from "../component/ImageSlider";


const ArticleHome = ({ article, onClose, deleteArtical }) => {
 
   if (!article) {
    return <div>Loading...</div>;
  }

  const { id, date, title, content, author, images } = article;
  return (
    <div className="article" dir = "rtl">


      <div className="content">

        <h1 className="title">{title}</h1>
       
        {date && (
          <div className="date">{format(date, 'dd-MM-yyyy')}</div>
        )}

        {author && (
          <div className="author"> {author}</div>
        )}

        <p className="text">{content}</p>

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

export default ArticleHome;