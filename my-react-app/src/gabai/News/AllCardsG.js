// AllCards.jsx
import React, { useState } from 'react';
import CardComponent from '../../component/CardComponent';
import Article from '../../component/Article';
import '../../assets/css/AllCards.css';

const AllCardsG = ({ title, cardsData , deleteArtical}) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleCardClick = (data) => {
    setSelectedArticle(data);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="all-cards">
      <h1 className="all-cards-title">{title}</h1>

      
      {selectedArticle ? (
        <Article article = {selectedArticle} onClose={handleCloseArticle} deleteArtical = {deleteArtical}/>
      ):<div className="cards-container">
      {cardsData.map((card) => (
          <CardComponent key={card.id} data={card} onClick={() => handleCardClick(card)}  />
        ))}</div>}
    </div>
  );
};

export default AllCardsG;
