import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteATask } from "../../utilities/apiRequests";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashAlt,
  faHandPointLeft,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskView.scss";

const TaskView = (props) => {
  const [isBusinessDays, setIsBusinessDays] = useState(true);
  const [tasks, setTasks] = useState(props.project.todos);
  const projectId = useParams().id;

  const handleToggleBusinessDays = () => {
    setIsBusinessDays(!isBusinessDays);
  };

  const handelDeleteTask = async (projectId, taskId) => {
    let updatedTasks = await deleteATask(projectId, taskId);
    setTasks(updatedTasks);
  };

  const getBusinessDayText = (targetDate) => {
    let businessDays = getBusinessDays(new Date(targetDate));
    let businessDaysText;
    if (businessDays === -1) {
      businessDaysText = "Business Day: No Time Left";
    } else if (businessDays === 0) {
      businessDaysText = "Business Day: < 1 Day Left";
    } else {
      businessDaysText = `Business Day: ${businessDays} Days Left`;
    }
    return businessDaysText;
  };

  const getCalenderDayText = (targetDate) => {
    let calenderDays = getCalenderDays(new Date(targetDate));
    let calenderDayText;
    if (calenderDays === -1) {
      calenderDayText = "Calender Day: No Time Left";
    } else if (calenderDays === 0) {
      calenderDayText = "Calender Day: < 1 Day Left";
    } else {
      calenderDayText = `Calender Day: ${calenderDays} Days Left`;
    }
    return calenderDayText;
  };

  const handleEdit = () => {
    console.log("hi");
  };

  return (
    <section className="tasks">
      <div className="tasks__head">
        <h2 className="tasks__title">Tasks</h2>
        <Link
          to={{
            pathname: `/project/${props.project.id}/tasks`,
            state: {
              teams: props.project.teams,
            },
          }}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
            className="tasks__add"
          />
        </Link>
      </div>

      <div className="tasks__container ">
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <article
              key={task.id}
              className={
                task.isComplete ||
                getCalenderDays(new Date(task.targetDate)) < 0
                  ? "tasks__card tasks__card--complete"
                  : "tasks__card"
              }
            >
              <div className="tasks__headline">
                <h3 className="tasks__title">{task.title}</h3>
                <div>
                  <FontAwesomeIcon
                    className="tasks__icon"
                    icon={faPencilAlt}
                    size="1x"
                    onClick={handleEdit}
                  />
                  <FontAwesomeIcon
                    className="tasks__icon"
                    icon={faTrashAlt}
                    size="1x"
                    className="tasks__delete"
                    onClick={() => handelDeleteTask(projectId, task.id)}
                  />
                </div>
              </div>
              <p className="tasks__date">Target Date: {task.targetDate}</p>
              <div className="tasks__toggle">
                <span
                  className="tasks__days"
                  onClick={handleToggleBusinessDays}
                >
                  {isBusinessDays
                    ? getBusinessDayText(task.targetDate)
                    : getCalenderDayText(task.targetDate)}
                </span>
                <FontAwesomeIcon
                  icon={faHandPointLeft}
                  size="1x"
                  className="tasks__click"
                  onClick={() => handleToggleBusinessDays()}
                />
              </div>
              {task.teams.length !== 0 &&
                task.teams.map((teamId) => (
                  <div key={teamId} className="tasks__teams">
                    <img
                      id="team__avatar"
                      src={
                        props.project.teams.find((team) => team.id === teamId)
                          .avatar
                      }
                      alt="team avatar"
                      className="tasks__team"
                    />
                  </div>
                ))}
            </article>
          ))}
      </div>
    </section>
  );
};

export default TaskView;
