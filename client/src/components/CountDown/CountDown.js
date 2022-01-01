import React, { useState } from "react";
import CountdownCal from "../../utilities/CountdownCal";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import congrats from "../../assets/images/congrats.gif";
import { format } from "date-fns";
import { createDate } from "../../utilities/getDays";
import "./CountDown.scss";

const CountDown = (props) => {
  const [isUTC, setIsUTC] = useState(false);
  const { days, hours, minutes, seconds, isTimeUp } = CountdownCal(
    new Date(props.launchDate)
  );
  //let localeDate = format(new Date(props.launchDate), "yyyy-MM-dd HH:mm");
  let localeDate = `${props.launchDate} 00:00`;
  // console.log(props.launchDate);
  let utcDate = createDate(props.launchDate);
  //console.log(utcDate);

  const getBusinessDayText = (targetDate) => {
    let businessDays = getBusinessDays(new Date(targetDate));
    let businessDaysText;
    if (businessDays === -1) {
      businessDaysText = "Business Day: No Time Left";
    } else if (businessDays === 0) {
      businessDaysText = "Business Day: less than 1 Day Left";
    } else {
      businessDaysText = `Business Day: ${businessDays} Days Left`;
    }
    return businessDaysText;
  };

  const handleToggleUTC = () => {
    setIsUTC(!isUTC);
  };

  return (
    <>
      {isTimeUp && (
        <section className="countdown--launched">
          <img src={congrats} alt="launched" />
          <p className="countdown__success-date">Launch Date:</p>
          <p className="countdown__success-date">{props.launchDate}</p>
        </section>
      )}

      {!isTimeUp && (
        <section className="countdown">
          <div className="countdown__main ">
            <div className="countdown__edit">
              <h2>Launch Date:</h2>
              <h2> {isUTC ? utcDate : localeDate}</h2>
              <p onClick={handleToggleUTC}>
                {isUTC ? "Show in Local Time" : "Show in UTC Time"}
              </p>
            </div>
            <h2 className="countdown__calendar">Calendar Days </h2>
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
            <h3 className="countdown__business">
              {getBusinessDayText(props.launchDate)}
            </h3>
          </div>
        </section>
      )}
    </>
  );
};

export default CountDown;
