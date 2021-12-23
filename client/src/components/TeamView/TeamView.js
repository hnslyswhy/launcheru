import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { teamCountDown } from "../../utilities/getDays";
import { deleteATeam } from "../../utilities/apiRequests";

const TeamView = (props) => {
  const [teams, setTeams] = useState(props.project.teams);

  const params = useParams();
  const projectId = params.id;

  const handelDeleteTeam = async (projectId, teamId) => {
    let updatedTeams = await deleteATeam(projectId, teamId);
    setTeams(updatedTeams);
  };
  return (
    <section className="">
      <div className="">
        <p className="">Teams</p>
        <Link to={`/project/${props.project.id}/addteam`}>
          <FontAwesomeIcon icon={faPlusCircle} size="2x" className="" />
        </Link>
      </div>

      <div>
        {teams.length !== 0 &&
          teams.map((team) => (
            <div key={team.id} className="">
              <h2> {team.name} </h2>
              <div className="">
                <img src={team.avatar} alt="team icon" className="" />
                <div className="">
                  <p>{team.description}</p>
                  <div className="">
                    <p>{teamCountDown(team.id, props.project.todos)}</p>
                    <p>{team.role}</p>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="2x"
                      className=""
                      onClick={() => handelDeleteTeam(projectId, team.id)}
                    />
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
