import DailyTimes from './DailyTimes';
import TfilaTimes from './TfilaTimes'
import '../assets/css/Times.css'
function Times() {
   
     
      
      
      return (
        <div className="times-container">
          <div className="tfila-timess">
           <TfilaTimes />
           </div>
          <div className="daily-timess"> 
             <DailyTimes  />
           </div> 
        </div>
      );
}

export default Times;