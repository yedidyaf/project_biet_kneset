import React, { useState, useEffect } from 'react';
import axios from '../component/Axios.js';
import ChangeArticleG from './ChangeArticalG';
import { useNavigate } from 'react-router-dom';
import ArticleHome from '../../Home/ArticleHome.js';
import GalleryCarousel from '../../component/GalleryCarousel.js';
import '../../assets/css/HomeG.css'

const HomeG = () => {
  const [isChange, setIsChange] = useState(false);
  const [article, setArticle] = useState(null);
  const [newA, setNewA] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {

    axios.get('gabai/home')
      .then(response => {
        setArticle(response.data);

      })
      .catch(error => {
        console.error('Error fetching article:', error);

        if (error.response && error.response.data && error.response.data.error) {
          const errorMessage = error.response.data.error;

          if (errorMessage === 'Authentication failed: Missing token') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else if (errorMessage === 'Forbidden: Invalid role') {
            console.log(errorMessage);
            navigate('/gabai/login');
          } else {
            console.log(errorMessage);
            navigate('/gabai/login');

          }
        }
      });
  }, [newA, isChange]);
  const onAddArticle = () => {
    setNewA('')
  }

  return (
    <div dir = "ltr">


      
      <br />
      <br />

      <div className="center-container">
        <button
          className='change-article-btn'
          onClick={() => {
            setIsChange((prev) => !prev)
          }}
        >
          שנה כתבה
        </button>
      </div>
      <br>
      </br>
{isChange && <ChangeArticleG
        title={"שנה כתבה"}
        onAddArticle={onAddArticle}
        article={article}
        isChange={() => setIsChange(false)}
        path={'/gabai/home'} />}
      {article && <GalleryCarousel images={article.images}/>}
      {/* {article ? (
        <ImageCarousel images={article.images} />
      ) : (
        <p>Loading article...</p>
      )} */}
      {article ? (
        <ArticleHome article={article} />
      ) : (
        <p>Loading article...</p>
      )}
      <br />


    </div>
  );
};

export default HomeG;
