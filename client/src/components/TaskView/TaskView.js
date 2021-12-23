import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TaskView = (props) => {
  const [isBusinessDays, setIsBusinessDays] = useState(true);
  const [tasks, setTasks] = useState(props.project.todos);
  const projectId = useParams().id;

  const handleToggleBusinessDays = () => {
    setIsBusinessDays(!isBusinessDays);
  };

  const handelDeleteTask = () => {};

  return (
    <section className="">
      <div className="">
        <h1 className="">Tasks</h1>
        <Link
          to={{
            pathname: `/project/${props.project.id}/tasks`,
            state: {
              teams: props.project.teams,
            },
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="2x" className="" />
        </Link>
      </div>

      <div>
        {tasks.length !== 0 &&
          tasks.map((task) => (
            <div
              key={task.id}
              className={task.isComplete ? "complete" : "progressing"}
            >
              <p>{task.title}</p>
              <p>{task.targetDate}</p>
              <p onClick={handleToggleBusinessDays}>
                {isBusinessDays
                  ? getBusinessDays(new Date(task.targetDate))
                  : getCalenderDays(new Date(task.targetDate))}
              </p>
              {task.teams.length !== 0 &&
                task.teams.map((teamId) => (
                  <div key={teamId} className="">
                    <img
                      src={
                        props.project.teams.find((team) => team.id === teamId)
                          .avatar
                      }
                      alt="team avatar"
                      className=""
                    />
                  </div>
                ))}
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="2x"
                className=""
                onClick={() => handelDeleteTask(projectId, task.id)}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default TaskView;
