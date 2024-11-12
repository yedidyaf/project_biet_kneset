import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../component/Axios';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import '../assets/css/ImageSlider.css';

const ImageCarousel = ({ images }) => {
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

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        afterChange: function(index) {
          console.log(
            `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
          );
        }
      };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                {arrImages.map((src, index) => (
                    <div key={index}>
<img src={src} alt={`תמונה ${index + 1}`} style={{ height: '300px', width: '450px', objectFit: 'cover', borderRadius: '10px' }} />
</div>
                ))}
            </Slider>
        </div>
    );
};

ImageCarousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageCarousel;
