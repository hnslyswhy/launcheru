import React, { useState } from "react";
import { createProject } from "../../utilities/apiRequests";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./ProjectForm.scss";

const ProjectForm = () => {
  const [isSecret, setIsSecret] = useState(false);
  const [projectSize, setProjectSize] = useState("small");
  const history = useHistory();

  const handleSecretProject = () => {
    setIsSecret(!isSecret);
  };

  const handleSizeValue = (size) => {
    setProjectSize(size);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newProject = {
      name: e.target.name.value,
      readOnly: isSecret,
      size: projectSize,
      launchDate: new Date(`${e.target.date.value}T23:59`),
      teams: [],
      todos: [],
    };
    /* 
    console.log(newProject.launchDate.toString());
    console.log(newProject.launchDate.toUTCString());
    console.log(newProject.launchDate.toLocaleDateString());
    console.log(new Date(newProject.launchDate)); */

    let project = await createProject(newProject);
    let projectId = project.id;
    e.target.reset();
    history.push(`/project/${projectId}`);
  };

  return (
    <form className="project-form" onSubmit={handleFormSubmit}>
      <h1 className="project-form__headline"> Setup Project</h1>
      <div className="project-form__sizes">
        <div
          id="small"
          onClick={() => handleSizeValue("small")}
          className="project-form__size project-form__size--small"
        ></div>
        <div
          id="medium"
          onClick={() => handleSizeValue("medium")}
          className="project-form__size project-form__size--medium"
        ></div>
        <div
          id="large"
          onClick={() => handleSizeValue("large")}
          className="project-form__size  project-form__size--large"
        ></div>
      </div>
      <div className="project-form__item">
        <div>
          <label htmlFor="name">Project Name:</label>
          <FontAwesomeIcon
            icon={faUserShield}
            size="lg"
            className={
              isSecret ? "project-form__secret-icon" : "project-form__icon"
            }
            onClick={handleSecretProject}
          />
        </div>
        <input
          id="name"
          name="name"
          type="text"
          className="project-form__input"
          required
        />
      </div>
      <div className="project-form__item">
        <label htmlFor="date" className="project-form__date">
          Project Launch Date:
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="project-form__input"
          required
        />
      </div>
      <button className="project-form__button">Kick Off</button>
    </form>
  );
};

export default ProjectForm;
