import React from "react";
import CountdownCal from "../../utilities/CountdownCal";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";

const CountDown = (props) => {
  const { hours, minutes, seconds, isTimeUp } = CountdownCal(
    new Date(props.launchDate)
  );
  const businessDays = getBusinessDays(new Date(props.launchDate));
  const days = getCalenderDays(new Date(props.launchDate));

  return (
    <section>
      <div>
        <h1>Calendar Days Countdown</h1>
        <div>
          <span className="days">{days}</span>
          <span>:</span>
          <span className="hours">{hours}</span>
          <span>:</span>
          <span className="minutes">{minutes}</span>
          <span>:</span>
          <span className="seconds">{seconds}</span>
        </div>
      </div>
      <div>
        <h2>Business Days : {businessDays}</h2>
      </div>
    </section>
  );
};

export default CountDown;
