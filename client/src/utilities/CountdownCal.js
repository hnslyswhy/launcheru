import { intervalToDuration, isBefore } from "date-fns";
import { useState, useEffect } from "react";

function CountdownCal(aDate) {
  const [now, setNow] = useState(new Date());
  const isTimeUp = isBefore(aDate, now);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [aDate]);

  if (isTimeUp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }

  // console.log(now);
  //console.log(aDate);
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: now,
    end: aDate,
  });

  return { years, months, days, hours, minutes, seconds, isTimeUp };
}

export default CountdownCal;
