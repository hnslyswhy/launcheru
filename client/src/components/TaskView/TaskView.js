import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getBusinessDays, getCalenderDays } from "../../utilities/getDays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEdit } from "@fortawesome/free-solid-svg-icons";

const TaskView = (props) => {
  const [isBusinessDays, setIsBusinessDays] = useState(true);
  const handleToggleBusinessDays = () => {
    setIsBusinessDays(!isBusinessDays);
  };

  return (
    <section className="">
      <div className="">
        <h1 className="">Tasks</h1>
        <Link to={`/projects/${props.project.id}/addtask`}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" className="" />
        </Link>
      </div>

      <div>
        {props.project.todos.map((task) => (
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
            {task.teams.length &&
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
            <Link
              to={`/projects/${props.project.id}/addtask`}
              teams={props.project.teams}
            >
              <FontAwesomeIcon icon={faEdit} size="lg" className="" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskView;
