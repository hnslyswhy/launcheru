import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTargetProject } from "../../utilities/apiRequests";
import PageHeader from "../../components/PageHeader/PageHeader";
import CountDown from "../../components/CountDown/CountDown";
import TeamView from "../../components/TeamView/TeamView";
import TaskView from "../../components/TaskView/TaskView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Project.scss";

const Project = () => {
  const [project, setProject] = useState(null);
  const [isUTC, setIsUTC] = useState(true);

  const params = useParams();
  const projectId = params.id;
  let projectData;

  useEffect(() => {
    getTargetProject(projectId).then((projectData) => {
      setProject(projectData);
    });
  }, [projectId]);

  const handleToggleUTC = () => {
    setIsUTC(!isUTC);
  };

  const handleEdit = () => {
    console.log("hi");
  };

  return (
    <main className="main-box">
      {project && (
        <>
          <PageHeader name={project.name} />
          <div className="main-box__timezone ">
            <p>{isUTC ? "Show in Local Time" : "Show in UTC Time"}</p>
            <FontAwesomeIcon
              icon={faHandPointLeft}
              size="1x"
              className="main-box__click"
              onClick={handleToggleUTC}
            />
          </div>
          <div className="main-box__edit">
            <p>Edit Project</p>
            <Link
              to={{
                pathname: `/project/${projectId}/edit`,
                state: {
                  id: project.id,
                  name: project.name,
                  launchDate: project.launchDate,
                },
              }}
            >
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="main-box__click"
                size="1x"
                onClick={handleEdit}
              />
            </Link>
          </div>

          <CountDown launchDate={project.launchDate} />
          <TeamView project={project} />
          <TaskView project={project} />
        </>
      )}
    </main>
  );
};

export default Project;
