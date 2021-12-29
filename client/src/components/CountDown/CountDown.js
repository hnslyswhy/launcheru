import React from "react";
import CountdownCal from "../../utilities/CountdownCal";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import congrats from "../../assets/images/congrats.gif";
import "./CountDown.scss";

const CountDown = (props) => {
  const { hours, minutes, seconds, isTimeUp } = CountdownCal(
    new Date(props.launchDate)
  );
  //console.log(new Date(props.launchDate));
  //console.log(format(new Date(props.launchDate), "yyyy-MM-dd"));
  const days = getCalenderDays(new Date(props.launchDate));

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
              <h1>Launch Date:</h1>
              <h2> {props.launchDate}</h2>
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
            <p className="countdown__business">
              {getBusinessDayText(props.launchDate)}
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default CountDown;
