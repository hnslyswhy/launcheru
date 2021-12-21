import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import CountDown from "../../components/CountDown/CountDown";
import TeamView from "../../components/TeamView/TeamView";
import TaskView from "../../components/TaskView/TaskView";
import ProjectData from "../../data.json";

const Project = () => {
  const { id, name, launchDate, teams, todos } = ProjectData;
  return (
    <main>
      <PageHeader name={name} />
      <CountDown launchDate={launchDate} />
      <TeamView project={ProjectData} />
      <TaskView project={ProjectData} />
    </main>
  );
};

export default Project;
