import Donation from "./Donation";
import michaelImg from '../assets/images/michael_haviv.png';
import biet_knesetImg from '../assets/images/biet_kneset.png';
const Donations = () => {
    const arrD = [
        {id:2, title:"ריהוט",
    content:`לאחרונה זכינו ובית הכנסת השתדרג בריהוט חדש ויוקרתי אך עדיין חסרים כמה אלפי שקלים כדי להשלים את הריהוט בבית הכנסת`, 
    how:"", images:[michaelImg, biet_knesetImg]},
    {id:3, title:"בית הכנסת תל גיבורים",
    content:`
    בית מדרש "חסדי יוסף" - בית חם ללומדי תורה
    
   
    ברכת "המרבה השלום" על כל אחינו בני ישראל!`, 
     images:[michaelImg, biet_knesetImg]},
    {id:4, title:"בית הכנסת תל גיבורים",
    content:`
    בית מדרש "חסדי יוסף" - בית חם ללומדי תורה
    ל!`, 
    author:"חיים זלמנוביץ", images:[michaelImg, biet_knesetImg]},
    {id:5, title:"בית הכנסת תל גיבורים",
    content:`
    בית מדרש "חסדי יוסף" - בית חם ללומדי תורה
    
    
     
    ברכת "המרבה ה`, 
    author:"חיים זלמנוביץ", images:[michaelImg, biet_knesetImg], date: 'jjj'}
    ]
    return (
      <div className="all-donations-container">
        {arrD.map((donation, index) => (
          <Donation key={index} donation={donation} />
        ))}
      </div>
    );
  };
  export default Donations;