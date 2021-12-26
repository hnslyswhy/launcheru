import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteATask } from "../../utilities/apiRequests";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashAlt,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskView.scss";

const TaskView = (props) => {
  const [isBusinessDays, setIsBusinessDays] = useState(true);
  const [tasks, setTasks] = useState(props.project.todos);
  const projectId = useParams().id;
  console.log(tasks);

  const handleToggleBusinessDays = () => {
    setIsBusinessDays(!isBusinessDays);
  };

  const handelDeleteTask = async (projectId, taskId) => {
    let updatedTasks = await deleteATask(projectId, taskId);
    setTasks(updatedTasks);
    console.log(tasks);
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

      <div className="tasks__container">
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
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  size="1x"
                  className="tasks__delete"
                  onClick={() => handelDeleteTask(projectId, task.id)}
                />
              </div>
              <p className="tasks__date">Target Date: {task.targetDate}</p>
              <div className="tasks__toggle">
                <p className="tasks__days" onClick={handleToggleBusinessDays}>
                  {isBusinessDays
                    ? `Business Days: ${getBusinessDays(
                        new Date(task.targetDate)
                      )} Day(s)`
                    : `Calender Days: ${getCalenderDays(
                        new Date(task.targetDate)
                      )} Day(s)`}
                </p>
                <FontAwesomeIcon
                  icon={faHandPointLeft}
                  size="1x"
                  className="tasks__click"
                  onClick={() => handelDeleteTask(projectId, task.id)}
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
