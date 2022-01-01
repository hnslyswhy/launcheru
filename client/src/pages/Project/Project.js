import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTargetProject } from "../../utilities/apiRequests";
import PageHeader from "../../components/PageHeader/PageHeader";
import CountDown from "../../components/CountDown/CountDown";
import TeamView from "../../components/TeamView/TeamView";
import TaskView from "../../components/TaskView/TaskView";
import PageFooter from "../../components/PageFooter/PageFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faHandPointLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Project.scss";

const Project = () => {
  const [project, setProject] = useState(null);
  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    getTargetProject(projectId).then((projectData) => {
      setProject(projectData);
    });
  }, [projectId]);

  return (
    <>
      <main className="main-box">
        {project && (
          <>
            <PageHeader name={project.name} />
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
                />
              </Link>
            </div>

            <CountDown launchDate={project.launchDate} />
            <TeamView project={project} />
            <TaskView project={project} />
          </>
        )}
      </main>
      <PageFooter />
    </>
  );
};

export default Project;
