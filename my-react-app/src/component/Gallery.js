import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
import '../assets/css/Gallery.css';

const Gallery = ({ images }) => {
  const [arrImages, setArrImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          images.map(async (imagePath) => {
            const response = await axios.get('/api/getImage', {
              params: {
                path: imagePath,
              },
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

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, arrImages.length - 1));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery">
      {images.length>1 && <button className="prev" onClick={prevImage} disabled={currentIndex === 0}>
        &#10094;
      </button>}

      <img src={arrImages[currentIndex]} className="gallery-image" alt={`Gallery Image ${currentIndex}`} />

      {images.length>1 && <button className="next" onClick={nextImage} disabled={currentIndex === arrImages.length - 1}>
        &#10095;
      </button>}
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;
