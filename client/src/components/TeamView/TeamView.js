import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTrashAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { teamCountDown } from "../../utilities/getDays";
import { deleteATeam } from "../../utilities/apiRequests";
import "./TeamView.scss";

const TeamView = (props) => {
  const [teams, setTeams] = useState(props.project.teams);

  const params = useParams();
  const projectId = params.id;

  const handelDeleteTeam = async (projectId, teamId) => {
    let updatedTeams = await deleteATeam(projectId, teamId);
    setTeams(updatedTeams);
  };
  return (
    <section className="teams">
      <div className="teams__head">
        <h2 className="teams__title">Teams</h2>
        <Link
          to={{
            pathname: `/project/${props.project.id}/teams`,
            state: {
              type: "add",
            },
          }}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2x"
            className="teams__add"
          />
        </Link>
      </div>

      <div className="teams__container">
        {teams.length !== 0 &&
          teams.map((team) => (
            <article key={team.id} className="teams__card">
              <h3 className="teams__name"> {team.name} </h3>
              <div className="teams__info">
                <img
                  src={team.avatar}
                  alt="team icon"
                  className="teams__avatar"
                />
                <div className="teams__intro">
                  <p className="teams__countdown">
                    {teamCountDown(team.id, props.project.todos)}
                  </p>
                  <div className="teams__tool">
                    <span className="teams__role">{team.role}</span>
                    <div>
                      <Link
                        to={{
                          pathname: `/project/${props.project.id}/teams`,
                          state: {
                            team: team,
                            type: "edit",
                          },
                        }}
                      >
                        <FontAwesomeIcon
                          className="teams__icon"
                          icon={faPencilAlt}
                          size="1x"
                        />
                      </Link>
                      <FontAwesomeIcon
                        className="teams__delete"
                        icon={faTrashAlt}
                        size="1x"
                        onClick={() => handelDeleteTeam(projectId, team.id)}
                      />
                    </div>
                  </div>
                </div>
                <p className="teams__description">{team.description}</p>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default TeamView;
