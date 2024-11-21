import React, { useState, useEffect } from 'react';
import {
  toJewishDate,
  formatJewishDateInHebrew,
} from "jewish-date";
const DateH = () => {

  const [dateStr, setDateStr] = useState();

  useEffect(() => {
    const fetchTimes = async () => {
      try {

        const date = new Date();
        console.log(date.getDay());
        const jewishDate = toJewishDate(date);
        const jewishDateInHebrewStr = formatJewishDateInHebrew(jewishDate);
        console.log(jewishDateInHebrewStr);
        setDateStr(jewishDateInHebrewStr);

      } catch (error) {

        console.log(error);
        
      }
    };

    fetchTimes();
  }, []);

  return (
    <div>{dateStr}</div>
  );
};


export default DateH;