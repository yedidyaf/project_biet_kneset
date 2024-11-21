import React, { useState, useEffect } from 'react';
import '../../assets/css/ChangeArticleg.css';
import axios from '../component/Axios';

const ChangeArticleG = ({ article, onAddArticle, path, isChange }) => {
  const [articleData, setArticleData] = useState({
    title: article.title || '',
    content: article.content || '',
    images: article.images || [],
    author: article.author || '',
  });
  
  const [images, setImages] = useState([]);
  const [toDelete, setToDelete] = useState([]);
  const [imagesToDeletePreview, setImagesToDeletePreview] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await Promise.all(
          articleData.images.map(async (imagePath) => {
            const response = await axios.get('/api/getImage', {
              params: {
                path: imagePath,
              },
              responseType: 'arraybuffer',
            });
            const imageUrl = URL.createObjectURL(
              new Blob([response.data], { type: 'image/png' })
            );
            return imageUrl;
          })
        );
        setExistingImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error('שגיאה בטעינת התמונות:', error);
        setLoading(false);
      }
    };

    if (articleData.images.length > 0) {
      fetchImages();
    } else {
      setLoading(false);
    }
  }, [articleData.images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (images.length + selectedImages.length > 5) {
      alert('ניתן להעלות עד 5 תמונות בלבד');
      return;
    }
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleImageDeletePreview = (index) => {
    if (!imagesToDeletePreview.includes(index)) {
      setImagesToDeletePreview([...imagesToDeletePreview, index]);
      setToDelete([...toDelete, index]);
    }
  };

  const handleUndoImageDelete = (index) => {
    setImagesToDeletePreview(imagesToDeletePreview.filter(i => i !== index));
    setToDelete(toDelete.filter(i => i !== index));
  };

  const removeNewImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('toDelete', JSON.stringify(toDelete));
    formData.append('title', articleData.title);
    formData.append('author', articleData.author);
    formData.append('content', articleData.content);

    try {
      const response = await axios.put(path, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onAddArticle();
      isChange();
    } catch (error) {
      console.error('שגיאה בעדכון הכתבה:', error);
      alert('אירעה שגיאה בעדכון הכתבה');
    }
  };

  return (
    <div className="edit-article-container">
      <div className="edit-article-card">
        <div className="edit-article-header">
          <h2>עריכת כתבה</h2>
        </div>
        <div className="edit-article-content">
          <form onSubmit={handleSubmit} className="edit-article-form" dir="rtl">
            <div className="form-group">
              <label>כותרת:</label>
              <input
                type="text"
                name="title"
                value={articleData.title}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>תוכן:</label>
              <textarea
                name="content"
                value={articleData.content}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label>הוספת תמונות חדשות (עד 5):</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="form-input"
              />
            </div>

            {!loading && existingImages.length > 0 && (
              <div className="form-group">
                <h3>תמונות קיימות:</h3>
                <div className="images-grid">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={imageUrl}
                        alt={`תמונה ${index + 1}`}
                        className={imagesToDeletePreview.includes(index) ? 'image-preview marked-delete' : 'image-preview'}
                      />
                      {!imagesToDeletePreview.includes(index) ? (
                        <button
                          type="button"
                          onClick={() => handleImageDeletePreview(index)}
                          className="delete-button"
                        >
                          מחק
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUndoImageDelete(index)}
                          className="undo-button"
                        >
                          בטל מחיקה
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {images.length > 0 && (
              <div className="form-group">
                <h3>תמונות חדשות להוספה:</h3>
                <div className="images-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-container">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`תצוגה מקדימה ${index + 1}`}
                        className="image-preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="delete-button"
                      >
                        הסר
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-buttons">
              <button type="button" onClick={() => isChange()} className="cancel-button">
                ביטול
              </button>
              <button type="submit" className="save-button">
                שמור שינויים
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>האם אתה בטוח שברצונך לשמור את השינויים?</h3>
            <p>פעולה זו תעדכן את הכתבה ותמחק את התמונות שסומנו למחיקה.</p>
            <div className="modal-buttons">
              <button onClick={() => setShowConfirmDialog(false)} className="modal-cancel">
                ביטול
              </button>
              <button onClick={handleConfirmSubmit} className="modal-confirm">
                אישור
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeArticleG;