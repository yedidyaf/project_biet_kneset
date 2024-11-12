import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
  }, [images]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel 
    autoFocus ={true}
    emulateTouch ={true}
    swipeable ={true}
    stopOnHover ={true}
    autoPlay ={true}
    useKeyboardArrows ={true}
    showThumbs ={false}
    infiniteLoop ={true}
    showIndicators ={true}
    showStatus ={true}
    showArrows ={true}
    centerMode={true}
      // showThumbs={false}
      // showStatus={false}
      // infiniteLoop={true}
      // useKeyboardArrows={true}
      centerSlidePercentage = {40}
      // autoPlay={true}
      // dynamicHeight={true}
      // className="carousel-container"
      // style={{ hight: '300px' }} // הוסף כיוון RTL
    >

      {arrImages.map((src, index) => (
          <div key={index + new Date()}>
            <img
              style={{width: '400px' }}
              src={src}
              alt={`תמונה ${index + 10}`}
              onError={(e) => {
                console.error(`Error loading image ${index + 1}:`, e);
                e.target.src = 'path/to/fallback-image.jpg'; // תמונת גיבוי
              }}
            />
          </div>
        )
      )}
    </Carousel>
  );
};

// GalleryCarousel.propTypes = {
//   images: PropTypes.arrayOf(PropTypes.string).isRequired,
// };

export default GalleryCarousel;
