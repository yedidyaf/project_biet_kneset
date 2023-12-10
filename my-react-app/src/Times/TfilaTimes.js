import React from "react";
import '../assets/css/TfilaTimes.css'
const TfilaTimes = ({ ArrTfilaTimes }) => {
    console.log(ArrTfilaTimes);
  const weekday = ArrTfilaTimes.filter(x => !x.is_sabbath); 
  const sabbath = ArrTfilaTimes.filter(x => x.is_sabbath);

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
        </tr>  
      ))}
    </tbody>
  </table>

</div>
      
    </div>
  );
};

export default TfilaTimes;