import React, { useState, useEffect } from 'react';

const TfilaTimesForm = ({ editMode, selectedPrayerId, onFormSubmit, ArrTfilaTimes }) => {
  const [formData, setFormData] = useState({
    name: '',
    time: '',
    is_sabbath: false,
    is_fixed_time: true,
    reference_time: '',
    minutes_offset: 0,
    is_before: true
  });

  const referenceTimeOptions = [
    { value: 'alotHaShachar', label: 'עלות השחר' },
    { value: 'misheyakir', label: 'משיכיר' },
    { value: 'sunrise', label: 'הנץ החמה' },
    { value: 'sofZmanShma', label: 'סוף זמן ק"ש' },
    { value: 'sofZmanShmaMGA', label: 'סוף זמן ק"ש מג"א' },
    { value: 'sofZmanTfilla', label: 'סוף זמן תפילה' },
    { value: 'sofZmanTfillaMGA', label: 'סוף זמן תפילה מג"א' },
    { value: 'chatzot', label: 'חצות' },
    { value: 'sunset', label: 'שקיעה' },
    { value: 'tzeit7083deg', label: 'צאת הכוכבים' }
  ];

  useEffect(() => {
    if (editMode && selectedPrayerId) {
      const selectedPrayer = ArrTfilaTimes.find(prayer => prayer.id === selectedPrayerId);
      if (selectedPrayer) {
        setFormData(selectedPrayer);
      }
    }
  }, [editMode, selectedPrayerId, ArrTfilaTimes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(editMode ? 'edit' : 'add', selectedPrayerId, formData);
    setFormData({
      name: '',
      time: '',
      is_sabbath: false,
      is_fixed_time: true,
      reference_time: '',
      minutes_offset: 0,
      is_before: true
    });
  };

  return (
    <div className="prayer-form-container">
      <h3>{editMode ? 'עריכת זמן תפילה' : 'הוספת זמן תפילה חדש'}</h3>

      <form onSubmit={handleSubmit} className="prayer-form">
        <div className="form-group">
          <label>שם התפילה</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group_">
          <label>סוג זמן</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={formData.is_fixed_time}
                onChange={() => setFormData(prev => ({ ...prev, is_fixed_time: true }))}
              />
              זמן קבוע
            </label>
            <label>
              <input
                type="radio"
                checked={!formData.is_fixed_time}
                onChange={() => setFormData(prev => ({ ...prev, is_fixed_time: false }))}
              />
              זמן יחסי
            </label>
          </div>
        </div>

        {formData.is_fixed_time ? (
          <div className="form-group">
            <label>שעה</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              required={formData.is_fixed_time}
            />
          </div>
        ) : (
          <div className="relative-time-inputs">
            <div className="form-group">
              <label>דקות</label>
              <input
                type="number"
                value={formData.minutes_offset}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  minutes_offset: parseInt(e.target.value) || 0
                }))}
                required={!formData.is_fixed_time}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>מיקום</label>
              <select
                value={formData.is_before ? 'before' : 'after'}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_before: e.target.value === 'before'
                }))}
              >
                <option value="before">לפני</option>
                <option value="after">אחרי</option>
              </select>
            </div>

            <div className="form-group_">
              <label>זמן ייחוס</label>
              <select
                value={formData.reference_time}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  reference_time: e.target.value
                }))}
                required={!formData.is_fixed_time}
              >
                <option value="">בחר זמן</option>
                {referenceTimeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="form-group_ checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={formData.is_sabbath}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                is_sabbath: e.target.checked
              }))}
            />
            זמן שבת
          </label>
        </div>

        <div className="form-actions">
          <button type="submit">
            {editMode ? 'עדכן' : 'הוסף'} זמן תפילה
          </button>
        </div>
      </form>
    </div>
  );
};

export default TfilaTimesForm;