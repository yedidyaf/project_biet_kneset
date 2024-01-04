import React, { useState, useEffect } from 'react';
import axios from '../component/Axios';
import Article from '../component/Article';

function Home() {
    const [articleData, setArticleData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/home'); // הניחו שיש לך נתיב מתאים בשרת שלך
                setArticleData(response.data);
            } catch (error) {
                console.error(error);
                setError('אירעה שגיאה בטעינת המידע. נסה שוב מאוחר יותר.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {articleData && <Article article={articleData} />}
        </div>
    );
}

export default Home;
