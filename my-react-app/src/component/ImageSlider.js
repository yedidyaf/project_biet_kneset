import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
// import '../assets/css/ImageSlider.css';

const ImageSlider = ({ images }) => {
  const [arrImages, setArrImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // שכפול התמונות ארבע פעמים להבטחת רצף אינסופי
  const repeatedImages = [...arrImages, ...arrImages, ...arrImages, ...arrImages];

  return (
    <div className="slider-container">
      <div className="slider-track">
        {repeatedImages.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`תמונה ${(index % arrImages.length) + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
