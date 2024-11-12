// AllCards.jsx
import React, { useState } from 'react';
import CardComponent from './CardComponent';
import Article from './Article';
import '../assets/css/AllCards.css';
import { useNavigate } from 'react-router-dom';


const AllCards = ({ title, cardsData }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();
  const handleCardClick = (data) => {
    navigate(`/news/${data.id}`);
    // setSelectedArticle(data);
  };

  // const handleCloseArticle = () => {
  //   setSelectedArticle(null);
  // };

  return (
    <div className="all-cards">
      {!selectedArticle && <h1 className="all-cards-title">{title}</h1>}

      
      {/* {selectedArticle ? (
        <Article article = {selectedArticle} onClose={handleCloseArticle} />
      ): */}
      <div className="cards-container">
      {cardsData && cardsData.map((card) => (
          <CardComponent key={card.id} data={card} onClick={() => handleCardClick(card)} />
        ))}</div>
        {/* } */}
    </div>
  );
};

export default AllCards;
