import React from 'react';
// import '../assets/css/Message.css'
const Message = ({ message, onClose }) => {

  return (
    <div className="message-container">
      <div className="message"
      onClick={e => e.stopPropagation()}>
        <p>{message}</p>
        <button onClick={onClose}>סגור</button>
      </div>
    </div>
  );

};

export default Message;