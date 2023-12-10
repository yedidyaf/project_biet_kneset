import React from 'react';
// import New from './New'; // החברה צריכה ליצור קומפוננטה זו
import '../assets/css/CardComponent.css';

const CardComponent = ({ data ,onClick}) => {
  const { id, title, content, author, images } = data;

//   const handleClick = () => {
//     onClick();
//   };

  return (
    <div className="card" onClick={onClick}>
      <img src={images[0]} alt={title} className="card-image" />
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{content.substring(0, 150)}...</p>
      <p className="card-author">{author}</p>
    </div>
  );
};

export default CardComponent;