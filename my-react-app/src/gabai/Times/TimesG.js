import DailyTimes from './DailyTimesG';
import TfilaTimes from './TfilaTimesG'
import '../../assets/css/Times.css'
function TimesG() {
   
      const timesData = {
        date: "2023-12-07",
        sunrise: "06:30 AM",
        sunset: "05:45 PM",
        shema: "18:00 PM",
        midnight: "12:00 AM",
        daf_yomi: "Berakhot 10"
      };
      
      return (
        <div className="times-container">
          {/* <div className="tfila-times"> */}
           <DailyTimes times={timesData} />
          {/* </div>
          <div className="daily-times"> */}
             <TfilaTimes/>
          {/* </div> */}
        </div>
      );
}

export default TimesG;