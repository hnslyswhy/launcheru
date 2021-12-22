import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { teamCountDown } from "../../utilities/getDays";

const TeamView = (props) => {
  return (
    <section className="">
      <div className="">
        <p className="">Teams</p>
        <Link to={`/projects/${props.project.id}/addteam`}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" className="" />
        </Link>
      </div>

      <div>
        {props.project.teams.map((team) => (
          <div key={team.id} className="">
            <h2> {team.name} </h2>
            <div className="">
              <img src={team.avatar} alt="team icon" className="" />
              <div className="">
                <p>{team.description}</p>
                <div className="">
                  <p>{teamCountDown(team.id, props.project.todos)}</p>
                  <p>{team.role}</p>
                  <Link to={`/projects/${props.project.id}/addteam`}>
                    <p className="">Edit</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamView;
