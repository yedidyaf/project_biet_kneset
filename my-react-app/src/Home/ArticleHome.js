import React from "react";
import { format } from 'date-fns';
import "../assets/css/Article.css";

const ArticleHome = ({ article, onClose, deleteArtical }) => {
  if (!article) {
    return <div>Loading...</div>;
  }

  const { id, date, title, content, author } = article;

  // פונקציה להמרת טקסט עם סימני פורמט למבנה HTML
  const formatText = (text) => {
    if (!text) return '';

    // מחלקים את הטקסט לחלקים לפי הסימנים המיוחדים
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      // בודקים אם החלק הוא טקסט מודגש (בין כוכביות)
      if (part.startsWith('**') && part.endsWith('**')) {
        // מסירים את הכוכביות ומחזירים span מודגש
        const innerText = part.slice(2, -2);
        return (
          <span key={index} className="highlighted-text" style={{ 
            fontWeight: 'bold',
            backgroundColor: '#fff3cd',
            padding: '0 4px',
            borderRadius: '2px'
          }}>
            {innerText}
          </span>
        );
      }
      // מחזירים טקסט רגיל
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="article" dir="rtl">
      <div className="content">
        <h1 className="title">{title}</h1>
        
        {date && (
          <div className="date">{format(date, 'dd-MM-yyyy')}</div>
        )}

        {author && (
          <div className="author">{author}</div>
        )}

        <p className="text">{formatText(content)}</p>

        {deleteArtical && (
          <button
            className="delete-button"
            onClick={() => deleteArtical(id)}>
            מחק כתבה
          </button>
        )}

        {date && author && (
          <button 
            className="close-button"
            onClick={onClose}>
            סגור
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleHome;