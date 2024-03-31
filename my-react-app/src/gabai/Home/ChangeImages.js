import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
// import '../assets/css/Gallery.css';

const ChangeImages = ({ images, setToDelete }) => {
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

 

  return (
    <div>{arrImages.map((image, index) => {
      return <div key={index} className="image-preview">
        <img src={image} alt={`תמונה ${index}`} />
        <p onClick={() => {
          setToDelete(prev => [...prev, index])
        }}>מחק</p>
      </div>
    })}
    </div>
  );
};

ChangeImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChangeImages;
