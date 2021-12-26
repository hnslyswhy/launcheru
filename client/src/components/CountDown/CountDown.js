import React from "react";
import CountdownCal from "../../utilities/CountdownCal";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import "./CountDown.scss";

const CountDown = (props) => {
  const { hours, minutes, seconds, isTimeUp } = CountdownCal(
    new Date(props.launchDate)
  );
  const businessDays = getBusinessDays(new Date(props.launchDate));
  const days = getCalenderDays(new Date(props.launchDate));

  return (
    <section className="countdown">
      <div className="countdown__main">
        <h1 className="countdown__calendar">Calendar Days </h1>
        <div className="countdown__details">
          <div className="countdown__entires">
            <div className="days">
              <span className="days__count">{days}</span>
              <span className="days__notes">Day</span>
            </div>
            <span className="countdown__mark">:</span>
          </div>

          <div className="countdown__entires">
            <div className="hours">
              <span className="hours__count">{hours}</span>
              <span className="hours__notes">Hr</span>
            </div>
            <span className="countdown__mark">:</span>
          </div>

          <div className="countdown__entires">
            <div className="minutes">
              <span className="minutes__count">{minutes}</span>
              <span className="minutes__notes">Min</span>
            </div>
            <span className="countdown__mark">:</span>
          </div>

          <div className="countdown__entires">
            <div className="seconds">
              <span className="seconds__count">{seconds}</span>
              <span className="seconds__notes">Sec</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="countdown__business">
          Business Days : {businessDays} Day(s)
        </h2>
      </div>
    </section>
  );
};

export default CountDown;
