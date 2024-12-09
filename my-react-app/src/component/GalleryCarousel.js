import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "../assets/css/GalleryCarousel.css"; 

const GalleryCarousel = ({ images }) => {
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

    // Cleanup function
    return () => {
      arrImages.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  if (loading) {    
    return <div className="gallery-loading">Loading...</div>;
  }

  return (
    <div className="gallery-container">
      <Carousel 
        autoFocus={true}
        emulateTouch={true}
        swipeable={true}
        stopOnHover={true}
        autoPlay={true}
        useKeyboardArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={true}
        showStatus={true}
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={40}
        className="gallery-carousel"
      >
        {arrImages.map((src, index) => (
          <div key={index + new Date()} className="gallery-slide">
            <div className="image-container">
              <img
                src={src}
                alt={`תמונה ${index + 1}`}
                onError={(e) => {
                  console.error(`Error loading image ${index + 1}:`, e);
                  e.target.src = 'path/to/fallback-image.jpg';
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

GalleryCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GalleryCarousel;