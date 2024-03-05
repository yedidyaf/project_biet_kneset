// News.js
import React, { useState, useEffect } from 'react';
import AllCards from '../component/AllCards.js';
import axios from '../component/Axios.js';

function News() {
  const [arrArticles, setArrArticles] = useState([]);

  useEffect(() => {
    console.log("kkkkkk");

    axios.get('/news') 
      .then(response => {
        console.log(response.data);
        setArrArticles(response.data);
        console.log("kkkkkk");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <AllCards title="חדשות" cardsData={arrArticles} />
  );
}

export default News;
