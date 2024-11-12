import React, { useState, useEffect } from 'react';
// import '../../assets/css/DonationForm.css';

const DonationForm = ({ selectedDonationId, onFormSubmit, donations }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [how, setHow] = useState('');
  const [image, setImage] = useState(null);



  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];

    setImage({
      src: URL.createObjectURL(selectedImage),
      alt: selectedImage.name,
      data: selectedImage,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image) {
      formData.append(`file`, image.data);
    }
    formData.append("title", title);
    formData.append("content", content);
    formData.append("how", how);
      onFormSubmit('add', null, formData);
      setTitle('');
      setContent('');
      setHow('');
      setImage(null);
    
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">כותרת:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="text-input" />
        </div>
        <div className="form-group">
          <label className="label">תוכן:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="textarea-input" />
        </div>
        <div className="form-group">
          <label className="label">איך לתרום:</label>
          <input type="text" value={how} onChange={(e) => setHow(e.target.value)} className="text-input" />
        </div>
        <div className="form-group">
          <label className="label file-input">תמונות:</label>
          <input type="file" accept="image/*" name='file' onChange={handleImageChange} />
        </div>
        {image && (
          <div className="form-group images-container">
            <p className="label">תמונות:</p>
            <img src={image.src} alt={image.alt} className="image-preview" />
          </div>
        )}
        <button type="submit" className="submit-button"> הוספת תרומה</button>
      </form>
    </div>
  );
};

export default DonationForm;
