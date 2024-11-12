import React, { useState } from 'react';
// import '../../assets/css/AddArticleG.css';
import axios from '../component/Axios';
import ChangeImages from './ChangeImages';

const ChangeArticleG = ({ article, onAddArticle, path, isChange }) => {
  const [articleData, setArticleData] = useState({
    title: article.title || '',
    content: article.content || '',
    images: article.images || [],
    author: article.author || '',
  });
  const [images, setImages] = useState([]);
  const [toDelete, setToDelete] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('toDelete', JSON.stringify(toDelete));
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('content', articleData.content);
    if(images.length > 4){
      alert('ניתן להעלות רק חמש תמונות');
      setImages([])
      return;
    }
    try {
      const response = await axios.put(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      onAddArticle();
      isChange();
    } catch (error) {
      console.error('Error updating article:', error);
    }

    setArticleData({
      title: '',
      content: '',
      author: '',
    });
    setImages([]);
    setToDelete([]);
  };

  return (
    <form className="add-article-form" onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={articleData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Content:
        <textarea
          name="content"
          value={articleData.content}
          onChange={handleChange}
        />
      </label>
      <label>
        Images (up to 5):
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
      <ChangeImages 
      setToDelete={setToDelete} 
      images={articleData.images || []} 
      />
      {images.map((image, index) => (
        <div key={index} className="image-preview">
          <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
          <span>{image.name}</span>
        </div>
      ))}
      <button type="submit">Update</button>
    </form>
  );
};

export default ChangeArticleG;
