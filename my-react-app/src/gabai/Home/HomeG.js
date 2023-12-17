import Article from "../../component/Article";
import michaelImg from '../../assets/images/michael_haviv.png';
import biet_knesetImg from '../../assets/images/biet_kneset.png';
import AddArticleG from "../News/AddArticaleG";
function HomeG() {
    const changeArtical = (article)=>{

    }
    return ( <div>
        <Article article={{id:2, title:"בית הכנסת תל גיבורים",
         content:`
         בית מדרש "חסדי יוסף" - בית חם ללומדי תורה
         
         בימים של מגפה וסכנה חיצונית התאחדו בחורים מהשכונה ללמוד יחדיו בבית מדרש ארעי, ליד ביתו של הגאון רבי יוסף צדיק זצ"ל. 
         בכל יום מצאו עוד יהודים את דרכם לאותו בית מדרש קטן אך חם, לשבת ולעסוק בתורה הקדושה בצוותא. 
         
         עם חלוף הסכנה ודעיכת המגפה, הפך אותו אוהל קטן למרכז תורני תוסס ומשגשג בלב השכונה. בכל שעות היום ניתן למצוא בו לומדים 
         השקועים בעמלה של תורה - החל מתינוקות של בית רבן וכלה באברכים היושבים על ארבע אמות של הלכה.  
         
         כולם מוזמנים להצטרף לחבורה - ללמוד, 
         לדון בסוגיות הפרשה, או פשוט לשתות חמין בצוותא ולחזק את הלבבות.
         
         ברכת "המרבה השלום" על כל אחינו בני ישראל!`, 
         author:"חיים זלמנוביץ", images:[michaelImg, biet_knesetImg]}}/><br/>
         <AddArticleG title={"שנה כתבה"} onAddArticle={changeArtical}/>
    </div>);
}

export default HomeG;
