import DailyTimes from './DailyTimesG';
import TfilaTimes from './TfilaTimesG'
import '../../assets/css/Times.css'
function TimesG() {
    const ArrTfilaTimes = [
        {
          id: 1,
          name: 'שחרית',
          time: '07:00',
          is_sabbath: false
        },
        {
          id: 2,
          name: 'מנחה',
          time: '19:15',
          is_sabbath: false
        },
        {
          id: 3, 
          name: 'קבלת שבת',
          time: '18:30',
          is_sabbath: true
        },
        {
          id: 4,
          name: 'שחרית',
          time: '09:00', 
          is_sabbath: true
        } 
      ];
      const timesData = {
        date: "2023-12-07",
        sunrise: "06:30 AM",
        sunset: "05:45 PM",
        shema: "18:00 PM",
        midnight: "12:00 AM",
        daf_yomi: "Berakhot 10"
      };
      
      console.log(ArrTfilaTimes);
      return (
        <div className="times-container">
          {/* <div className="tfila-times"> */}
           <DailyTimes times={timesData} />
          {/* </div>
          <div className="daily-times"> */}
             <TfilaTimes ArrTfilaTimes={ArrTfilaTimes} />
          {/* </div> */}
        </div>
      );
}

export default TimesG;