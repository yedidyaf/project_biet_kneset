import React, { useEffect, useState } from 'react';
import CardComponent from '../../component/CardComponent';
import Article from '../../component/Article';
// import '../../assets/css/AllCards.css';
import axios from '../component/Axios';
import { useNavigate } from 'react-router-dom';


const AllCardsG = ({ title, AddArticle }) => {
  const navigate = useNavigate();

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [cardsData, setCardsData] = useState([]);
  const [newA, setNewA] = useState(true);

  useEffect(() => {
    axios.get('/gabai/news')
      .then(response => {
        setCardsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        if(error.response.data.error==='Authentication failed: Missing token'){
          navigate('/gabai/login');
        }
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
    // AddArticle();
  }

  const handleCardClick = (data) => {
    navigate(`/gabai/news/${data.id}`);
  };

  

  return (
    <div className="all-cards">
      {!selectedArticle&& <h1 className="all-cards-title">{title}</h1>}
      

      { <div className="cards-container">
        {cardsData.map((card) => (
          <CardComponent key={card.id} data={card} onClick={() => handleCardClick(card)} />
        ))}</div>}
    </div>
  );
};

export default AllCardsG;
