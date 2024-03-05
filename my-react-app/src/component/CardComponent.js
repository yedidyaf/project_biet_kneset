import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import '../assets/css/CardComponent.css';

const CardComponent = ({ data, onClick }) => {
  const { id, title, content, author, images } = data;
const [image, setImage] = useState(null);

  useEffect(() => {
    
  const getImageFromServer = async () => {
    const imagePath = images[0];
    try {
      const response = await axios.get('/api/getImage', {
        params: {
          path: imagePath,
        },
        responseType: 'arraybuffer',
      });

      const blob = new Blob([response.data], { type: 'image/png' });

      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
       setImage(imageUrl);
    } catch (error) {
      console.error('שגיאה בקבלת התמונה מהשרת:', error);
    }
  };
  if(images)getImageFromServer(images[0])
  }, [data]); 

  return (
    <div className="card" onClick={onClick}>
      
        <img src={image} alt={title} className="card-image" />
      
      <h2 className="card-title">{title}</h2>
      <p className="card-content">{content.substring(0, 150)}...</p>
      <p className="card-author">{author}</p>
    </div>
  );
};

export default CardComponent;
