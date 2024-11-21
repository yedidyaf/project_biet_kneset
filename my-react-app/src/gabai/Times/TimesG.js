import DailyTimes from './DailyTimesG';
import TfilaTimes from './TfilaTimesG'
import '../../assets/css/Times.css'

function TimesG() {
   
      
      return (
        <div className="times-container">
          <div className="tfila-times">
            <TfilaTimes/>
           </div>
          <div className="daily-times"> 
            <DailyTimes  />
           </div> 
        </div>
      );
}

export default TimesG;