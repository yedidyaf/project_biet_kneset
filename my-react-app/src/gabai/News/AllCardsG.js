// AllCards.jsx
import React, { useEffect, useState } from 'react';
import CardComponent from '../../component/CardComponent';
import Article from '../../component/Article';
import '../../assets/css/AllCards.css';
import axios from '../../component/Axios';


const AllCardsG = ({ title, AddArticle }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [cardsData, setCardsData] = useState([]);
  const [newA, setNewA] = useState(true);
  console.log("kkkkkk");
  useEffect(() => {
    axios.get('/gabai/news')
      .then(response => {
        setCardsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [newA]);

  const deleteArtical = (id) => {
    axios.delete(`/gabai/news/${id}`)
      .then(response => {
        console.log(response.data);
        setSelectedArticle(null)
        setNewA((prev)=>!prev)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    setNewA((prev) => !prev);
    AddArticle();
  }

  const handleCardClick = (data) => {
    setSelectedArticle(data);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="all-cards">
      <h1 className="all-cards-title">{title}</h1>
      <div className="cards-container">
        {/* {cardsData.map((card) => (
          <CardComponent key={card.id} data={card} onDelete={AddArticle} />
        ))} */}
      </div>

      {selectedArticle ? (
        <Article article={selectedArticle} onClose={handleCloseArticle} deleteArtical={deleteArtical} />
      ) : <div className="cards-container">
        {cardsData.map((card) => (
          <CardComponent key={card.id} data={card} onClick={() => handleCardClick(card)} />
        ))}</div>}
    </div>
  );
};

export default AllCardsG;
