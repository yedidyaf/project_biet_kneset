import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/Gallery.css';

const Gallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <div className="gallery">
      <button className="prev" onClick={prevImage} disabled={currentIndex === 0}>
        &#10094;
      </button>

      <img src={images[currentIndex]} className="gallery-image" alt={`Gallery Image ${currentIndex}`} />

      <button className="next" onClick={nextImage} disabled={currentIndex === images.length - 1}>
        &#10095;
      </button>
    </div>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Gallery;


// import React, { useState } from 'react';
// import '../assets/css/Gallery.css'
// const Gallery = ({ images }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevImage = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   }

//   const nextImage = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   }
 
  
//      return (
//     <div className="gallery">
//       <button className="prev" onClick={prevImage}>&#10094;</button>

//       <img src={images[currentIndex]} className="gallery-image" />

//       <button className="next" onClick={nextImage}>&#10095;</button>
//     </div>
//   );
// };

  
  
 
// export default Gallery;


