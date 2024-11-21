import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import ArticleHome from './ArticleHome';
import "../assets/css/Home.css"
import GalleryCarousel from '../component/GalleryCarousel';

function Home() {
    const [articleData, setArticleData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            
            try {
                const response = await axios.get('/home');
                setArticleData(response.data);
            } catch (error) {
                console.error(error);
                setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
            }
        };

        fetchData();
    }, []);

    return (
        <div dir = "ltr" >
            {articleData && <GalleryCarousel images={articleData.images}/>}
            {error && <p>{error}</p>}

            {articleData && <ArticleHome article={articleData} />}
        </div>
    );
}

export default Home;
