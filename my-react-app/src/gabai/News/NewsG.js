import React, { useEffect, useState } from 'react';
import axios from '../../component/Axios';
import CardComponent from '../../component/CardComponent';
import AddArticleG from './AddArticaleG';
import AllCards from '../../component/AllCards';
import AllCardsG from './AllCardsG';

const NewsG = () => {
  
  const [addA, setAddA] = useState(false);
  const onAddArticle=()=>{
    setAddA((prev)=>!prev)
  };
  return (<div>
    <AllCardsG title={"חדשות"}
    AddArticle = {onAddArticle}/>
      <button onClick={()=>{setAddA((prev)=>!prev)}}>הוסף כתבה</button>
      {addA&&<AddArticleG title={"הוסף כתבה"}
        onAddArticle={onAddArticle}
        path={'/gabai/news'} />}
    </div>
  );
};

export default NewsG;
