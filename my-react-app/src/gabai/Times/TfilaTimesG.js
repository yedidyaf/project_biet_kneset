// TfilaTimesG.jsx
import React, { useState } from "react";
import '../../assets/css/TfilaTimes.css';
import TfilaTimesForm from "./TfilaTimesForm";

const TfilaTimesG = ({ ArrTfilaTimes, onEditClick }) => {
  console.log(ArrTfilaTimes);
  const weekday = ArrTfilaTimes.filter(x => !x.is_sabbath); 
  const sabbath = ArrTfilaTimes.filter(x => x.is_sabbath);

  const [editMode, setEditMode] = useState(false);
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);

  const handleEditClick = (prayerId) => {
    setEditMode(true);
    setSelectedPrayerId(prayerId);
  };

  const handleAddClick = () => {
    setEditMode(false);
    setSelectedPrayerId(null);
  };

  const handleFormSubmit = (method, id, data) => {
    console.log(method,id,data);
    setEditMode(false)
    setSelectedPrayerId(null)
  };

  return (
    <div className="prayer-times">
      <div className="frame">
        <h3>זמני תפילות (ימות חול)</h3>
        <table>
          <tbody>
            {weekday.map(prayer => (
              <tr key={prayer.id}>
                <td>{prayer.name}</td>
                <td>{prayer.time}</td>
                <td>
                  <button onClick={() => handleEditClick(prayer.id)}>עריכה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="frame">
        <h3>זמני תפילות (שבת)</h3>
        <table>
          <tbody>
            {sabbath.map(prayer => (
              <tr key={prayer.id}>
                <td>{prayer.name}</td>
                <td>{prayer.time}</td>
                <td>
                  <button onClick={() => handleEditClick(prayer.id)}>עריכה</button>
                </td>
              </tr>  
            ))}
          </tbody>
        </table>
      </div>

      <h4>הוספת ועריכת זמני תפילות</h4>
      <TfilaTimesForm
        editMode={editMode}
        selectedPrayerId={selectedPrayerId}
        onFormSubmit={handleFormSubmit}
        ArrTfilaTimes={ArrTfilaTimes}
      />
    </div>
  );
};

export default TfilaTimesG;
