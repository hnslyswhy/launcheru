import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTargetProject } from "../../utilities/apiRequests";
import PageHeader from "../../components/PageHeader/PageHeader";
import CountDown from "../../components/CountDown/CountDown";
import TeamView from "../../components/TeamView/TeamView";
import TaskView from "../../components/TaskView/TaskView";

const Project = () => {
  const [project, setProject] = useState(null);
  const params = useParams();
  const projectId = params.id;
  let projectData;

  useEffect(() => {
    getTargetProject(projectId).then((projectData) => {
      setProject(projectData);
    });
  }, [projectId]);

  return (
    <main>
      {project && (
        <>
          <PageHeader name={project.name} />
          <CountDown launchDate={project.launchDate} />
          <TeamView project={project} />
          <TaskView project={project} />
        </>
      )}
    </main>
  );
};

export default Project;
