import React, { useEffect, useState } from "react";
import Gallery from "./Gallery";
import { format } from 'date-fns';
import "../assets/css/Article.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../component/Axios.js';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/news/${id}`)
      .then(response => {
        setArticle(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [id]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found.</div>;
  }
  return (
    <div className="article">
      <div className="content">
        <h1 className="title">{article.title}</h1>
        <div className="images">
          {article.images && article.images.length > 0 && <Gallery images={article.images} />}
        </div>
        {article.date && (
          <div className="date__">{format(new Date(article.date), 'dd-MM-yyyy')}</div>
        )}
        {article.author && (
          <div className="author__">{article.author}</div>
        )}
        <p className="text__">{article.content}</p>
        <button className="close-button_" onClick={() => { navigate(`/news`); }}>
          לחזרה
        </button>
      </div>
    </div>
  );
};

export default Article;