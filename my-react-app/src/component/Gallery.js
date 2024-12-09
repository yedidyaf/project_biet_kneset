import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
import '../assets/css/Gallery.css';

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

    return () => {
      arrImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(arrImages.length - 1, prevIndex + 1));
  };

  if (loading) {
    return (
      <div className="custom_gallery_loader">
        <div className="custom_gallery_loader_text">טוען תמונות...</div>
      </div>
    );
  }

  const showNavigation = arrImages.length > 1;
  const showPrevButton = showNavigation && currentIndex > 0;
  const showNextButton = showNavigation && currentIndex < arrImages.length - 1;

  return (
    <div className="custom_gallery_container" dir="ltr">
      <div className="custom_gallery_content">
        <div className="custom_gallery_image_wrapper">
          {arrImages.map((src, index) => (
            <img
              key={index}
              src={src}
              className={`custom_gallery_image ${
                index === currentIndex ? 'custom_gallery_image_active' : 'custom_gallery_image_hidden'
              }`}
              alt={`תמונה ${index + 1}`}
            />
          ))}
        </div>
        
        {showPrevButton && (
          <button
            className="custom_gallery_nav_button custom_gallery_prev_button"
            onClick={handlePrevClick}
            type="button"
            aria-label="Previous image"
          >
            <span className="custom_gallery_nav_icon">&#10094;</span>
          </button>
        )}
        
        {showNextButton && (
          <button
            className="custom_gallery_nav_button custom_gallery_next_button"
            onClick={handleNextClick}
            type="button"
            aria-label="Next image"
          >
            <span className="custom_gallery_nav_icon">&#10095;</span>
          </button>
        )}
      </div>
      
      {showNavigation && (
        <div className="custom_gallery_counter">
          {currentIndex + 1} / {arrImages.length}
        </div>
      )}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;