import DailyTimes from './DailyTimes';
import TfilaTimes from './TfilaTimes'
import '../assets/css/Times.css'
function Times() {

      return (
        <div className="times-container">
          <div className="tfila-times">
           <TfilaTimes />
           </div>
          <div className="daily-times"> 
             <DailyTimes  />
           </div> 
        </div>
      );
}

export default Times;