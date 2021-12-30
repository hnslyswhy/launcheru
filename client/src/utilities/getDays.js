import {
  differenceInBusinessDays,
  differenceInDays,
  isBefore,
  max,
} from "date-fns";
import React from "react";

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
  return differenceInDays(aDate, new Date());
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

export function createDate(num) {
  let postDate = new Date(num);
  let postMonth = postDate.getUTCMonth();
  let postDay = postDate.getUTCDate();
  let postYear = postDate.getUTCFullYear();
  let postHours = postDate.getUTCHours();
  let postMins = postDate.getUTCMinutes();
  postHours = postHours.toString().padStart(2, "0");
  postMins = postMins.toString().padStart(2, "0");
  postMonth = (postMonth + 1).toString().padStart(2, "0");
  postDay = postDay.toString().padStart(2, "0"); //str.padStart(targetLength, padString)
  postDate = `${postYear}-${postMonth}-${postDay} ${postHours}:${postMins}`;
  return postDate;
}
