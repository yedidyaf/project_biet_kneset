import React, { useEffect, useState } from "react";
import { format } from 'date-fns';
// import "../../assets/css/Article.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../component/Axios.js';
import Gallery from "../../component/Gallery.js";

const ArticleG = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`/gabai/news/${id}`)
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
          <div className="date">{format(new Date(article.date), 'dd-MM-yyyy')}</div>
        )}
        {article.author && (
          <div className="author">{article.author}</div>
        )}
        <p className="text">{article.content}</p>
        <button className="close-button" onClick={() => { navigate(`/gabai/news`); }}>
          סגור
        </button>
      </div>
    </div>
  );
};

export default ArticleG;