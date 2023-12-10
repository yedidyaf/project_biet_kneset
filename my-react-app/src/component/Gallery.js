import React, { useState } from 'react';
import '../assets/css/Gallery.css'
const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }
 
  
     return (
    <div className="gallery">
      <button className="prev" onClick={prevImage}>&#10094;</button>

      <img src={images[currentIndex]} className="gallery-image" />

      <button className="next" onClick={nextImage}>&#10095;</button>
    </div>
  );
};

  
  
 
export default Gallery;