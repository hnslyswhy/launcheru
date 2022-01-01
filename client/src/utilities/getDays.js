import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  differenceInDays,
  isBefore,
  max,
} from "date-fns";

//get full days difference
export function getFullDayDifference(aDate) {
  const isTimeUp = isBefore(aDate, new Date());
  if (isTimeUp) {
    return -1;
  }
  //console.log(differenceInBusinessDays(aDate, new Date()));
  return differenceInDays(aDate, new Date());
}

//get business days
export function getBusinessDays(aDate) {
  const isTimeUp = isBefore(aDate, new Date());
  if (isTimeUp) {
    return -1;
  }
  //console.log(differenceInBusinessDays(aDate, new Date()));
  return differenceInBusinessDays(aDate, new Date());
}

//get calender days
export function getCalenderDays(aDate) {
  const isTimeUp = isBefore(aDate, new Date());
  if (isTimeUp) {
    return -1;
  }
  //console.log(differenceInDays(aDate, new Date()));
  return differenceInCalendarDays(aDate, new Date());
}

// get team countdonw
export function teamCountDown(teamid, todoList) {
  let dates = [];
  let teamTodos = todoList.filter((task) => task.teams.includes(teamid));
  teamTodos.forEach((task) => dates.push(new Date(task.targetDate)));
  if (dates.length === 0) {
    return "-";
  }
  //console.log(max(dates));
  return max(dates).toUTCString().slice(0, 16);
}

export function createDate(day) {
  // passed in as local time already, when go through new Date(), was treated as utc
  let postDate = new Date(`${day}T23:59`);
  //console.log(postDate);
  //console.log(day);
  let postMonth = postDate.getUTCMonth();
  let postDay = postDate.getUTCDate();
  let postYear = postDate.getUTCFullYear();
  let postHours = postDate.getUTCHours();
  let postMins = postDate.getUTCMinutes();
  let configHours = postHours.toString().padStart(2, "0");
  let configMins = postMins.toString().padStart(2, "0");
  let configMonth = (postMonth + 1).toString().padStart(2, "0");
  let configDay = postDay.toString().padStart(2, "0"); //str.padStart(targetLength, padString)
  //console.log(postYear);
  //console.log(configDay);
  //console.log(configMonth);
  postDate = `${postYear}-${configMonth}-${configDay} ${configHours}:${configMins}`;
  return postDate;
}
