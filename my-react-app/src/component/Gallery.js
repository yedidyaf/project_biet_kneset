import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';

const Gallery = ({ images }) => {
  const [arrImages, setArrImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          images.map(async (imagePath) => {
            const response = await axios.get('/api/getImage', {
              params: { path: imagePath },
              responseType: 'arraybuffer',
            });
            const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
            console.log(imageUrl);
            
            return imageUrl;
          })
        );
        setArrImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error('שגיאה בקבלת התמונות מהשרת:', error);
        setLoading(false);
      }
    };
    fetchImages();
  }, [images]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery">
      {arrImages.map((src, index) => (
        <img
          key={index}
          src={src}
          className={`gallery-image ${index === currentIndex ? 'active' : ''}`}
          alt={`תמונה ${index + 1}`}
        />
      ))}
      <button className="prev" onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + arrImages.length) % arrImages.length)}>
      &#10095;
      </button>
      <button className="next" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % arrImages.length)}>
      &#10094;
      </button>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;