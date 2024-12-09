import React, { useState, useEffect } from 'react';
// import '../../assets/css/DonationForm.css';

const DonationForm = ({ onFormSubmit, donations }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [defaultAmount, setDefaultAmount] = useState('36');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('defaultAmount', defaultAmount);
    
    if (image) {
        formData.append('file', image);
    }

    onFormSubmit(formData);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">כותרת:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="text-input" 
            required
          />
        </div>
        <div className="form-group">
          <label className="label">תוכן:</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="textarea-input" 
            required
          />
        </div>
        <div className="form-group">
          <label className="label">סכום דיפולטיבי:</label>
          <input 
            type="number" 
            min="1"
            value={defaultAmount} 
            onChange={(e) => setDefaultAmount(e.target.value)} 
            className="text-input" 
            required
          />
        </div>
        <div className="form-group">
          <label>תמונה:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        {imagePreview && (
          <div className="form-group images-container">
            <p className="label">תצוגה מקדימה:</p>
            <img 
              src={imagePreview} 
              alt="תצוגה מקדימה" 
              className="image-preview"
            />
          </div>
        )}
        <button type="submit" className="submit-button">הוספת תרומה</button>
      </form>
    </div>
  );
};
export default DonationForm;
