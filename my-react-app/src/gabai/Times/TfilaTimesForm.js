import React, { useState, useEffect } from 'react';

const TfilaTimesForm = ({ editMode, selectedPrayerId, onFormSubmit, ArrTfilaTimes }) => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [isSabbath, setIsSabbath] = useState(false);

  useEffect(() => {
    if (editMode && selectedPrayerId !== null) {
      const selectedPrayer = ArrTfilaTimes.find(prayer => prayer.id === selectedPrayerId);
      if (selectedPrayer) {
        setName(selectedPrayer.name);
        setTime(selectedPrayer.time);
        setIsSabbath(selectedPrayer.is_sabbath);
      }
    }
  }, [editMode, selectedPrayerId]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = {
      name,
      time,
      is_sabbath: isSabbath,
    };

    if (editMode) {
      
      onFormSubmit('PUT', selectedPrayerId, formData);
      setName('');
      setTime('');
      setIsSabbath(false);


    } else {
     
      onFormSubmit('add', null, formData);
      setName('');
      setTime('');
      setIsSabbath(false);
    }
  };
 console.log(isSabbath);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        שם:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br/>
      <label>
        זמן:
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <br/>
      <label>
        זה תפילת שבת:
        <input type="checkbox" checked={isSabbath} onChange={() => setIsSabbath(!isSabbath)} />
      </label>
      <br/>
      <button type="submit">{editMode ? 'שמירת שינויים' : 'הוספת זמן תפילה'}</button>
    </form>
  );
};

export default TfilaTimesForm;
