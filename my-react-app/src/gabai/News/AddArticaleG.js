// AddArticleG.jsx
import React, { useState } from 'react';
import '../../assets/css/AddArticleG.css';

const AddArticleG = ({title, onAddArticle }) => {
  const [articleData, setArticleData] = useState({
    title: '',
    content: '',
    images: [],
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onload = (event) => {
        imagesArray.push({
          name: files[i].name,
          src: event.target.result,
        });

        setArticleData((prevData) => ({
          ...prevData,
          images: imagesArray,
        }));
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString();
    const articleWithDate = { ...articleData, date: currentDate };

    // המשתמש יכול להוסיף כאן לוגיקה נוספת כמו אימות ועוד
console.log(articleWithDate);
    onAddArticle(articleWithDate);

    // ניקוי הטופס לאחר שליחת הכתבה
    setArticleData({
      title: '',
      content: '',
      images: [],
      author: '',
    });
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
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
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
