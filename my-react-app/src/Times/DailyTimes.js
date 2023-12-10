import '../assets/css/DailyTimes.css'
const DailyTimes = ({ times }) => {
  return (
    <div className="daily-times">
      <h2 className="title">זמני היום</h2>
      
      <table className="table">
        <tbody>
          <tr>
            <td className="cell">תאריך</td>
            <td className="cell">{times.date}</td>
          </tr>
          <tr>  
            <td className="cell">זריחה</td>
            <td className="cell">{times.sunrise}</td>
          </tr>
          <tr>
            <td className="cell">שקיעה</td>
            <td className="cell">{times.sunset}</td>
          </tr>
          <tr>
            <td className="cell">סוף זמן ק"ש</td> 
            <td className="cell">{times.shema}</td>
          </tr>
          <tr>
            <td className="cell">חצות</td>
            <td className="cell">{times.midnight}</td>
          </tr>
          <tr>
            <td className="cell">דף היומי</td>
            <td className="cell">{times.daf_yomi}</td>
          </tr>     
        </tbody>
      </table>
    </div>
  );  
};

export default DailyTimes;