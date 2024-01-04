import React, { useState, useEffect } from 'react';
import axios from '../../component/Axios';
import Article from "../../component/Article";
import AddArticleG from "../News/AddArticaleG";
import ChangeArticleG from './ChangeArticalG';

const HomeG = () => {
  const [isChange, setIsChange] = useState(false);
  const [article, setArticle] = useState(null);
  const [newA, setNewA] = useState(true);
  useEffect(() => {
    axios.get('gabai/home')
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [newA]);
const onAddArticle=()=>{
  setNewA('')
}

  return (
    <div>
      {article ? (
        <Article article={article} />
      ) : (
        <p>Loading article...</p>
      )}
      <br />

      <button 
      onClick={() => setIsChange((prev) => !prev)}>שנה כתבה
      </button>

      {isChange&&<ChangeArticleG
       title={"שנה כתבה"} 
       onAddArticle={onAddArticle}
        article={article} 
        isChange ={()=>setIsChange(false)}
      path = {'/gabai/home'}/>}
    </div>
  );
};

export default HomeG;
