// AddArticleG.jsx
import React, { useState } from 'react';
import '../../assets/css/AddArticleG.css';
import axios from '../component/Axios';

const AddArticleG = ({ title, onAddArticle, path }) => {
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    images: [],
    author: '',
  });
  const [images, setImages] = useState([]);
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    if (event.key === 'Enter') {
      console.log(7777);
      // הוספת שורה רווח במיקום הנוכחי של הסמן
      const { selectionStart, selectionEnd } = event.target;
      const newContent = `${articleData.content.slice(0, selectionStart)}\n${articleData.content.slice(selectionEnd)}`;
      // עדכון שדה התוכן בסטייט
      setArticleData((prevData) => ({
        ...prevData,
        [name]: newContent,
      }));
    }
    // אחרת, ביצוע השמה רגילה
    else {
      setArticleData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // הוספת תמונות מרובות ל-FormData
    console.log(images);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    // הוספת נתוני הטופס האחרים
    formData.append("title", articleData.title);
    formData.append("author", articleData.author);
    formData.append("content", articleData.content);
    try {
      const response = await axios.post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      onAddArticle();
    } catch (error) {
      console.error('שגיאה בעדכון המאמר:', error);
    }

    // ניקוי הטופס והתמונות לאחר שליחה
    setArticleData({
      title: '',
      content: '',
      author: '',
    });
    setImages([]);
  };

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
      <h3> {title}</h3>
      <label>
        כותרת:
        <input
          type="text"
          name="title"
          value={articleData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        תוכן:
        <textarea
          name="content"
          value={articleData.content}
          onChange={handleChange}
        />
      </label>
      <label>
        תמונות (עד 5):
        <input
          type="file"
          name='images'
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
      {images.map((image, index) => (
        <div key={index} className="image-preview">
          <img src={URL.createObjectURL(image)} alt={`תמונה ${index}`} />
          <span>{image.name}</span>
        </div>
      ))}
      <label>
        שם הכותב:
        <input
          type="text"
          name="author"
          value={articleData.author}
          onChange={handleChange}
        />
      </label>
      <button type="submit">שלח</button>
    </form>
  );
};



export default AddArticleG;
