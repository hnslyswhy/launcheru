import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./ProjectForm.scss";

const ProjectForm = () => {
  const [isSecret, setIsSecret] = useState(false);

  const handleSecretProject = () => {
    setIsSecret(!isSecret);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="project-form" onSubmit={handleFormSubmit}>
      <h1 className="project-form__headline"> Launch Your Project</h1>
      <div className="project-form__sizes">
        <div className="project-form__size project-form__size--small"></div>
        <div className="project-form__size project-form__size--medium"></div>
        <div className="project-form__size  project-form__size--large"></div>
      </div>
      <div className="project-form__item">
        <label htmlFor="name">Project Name</label>
        <input id="name" type="text" className="project-form__input" required />
        <FontAwesomeIcon
          icon={faUserShield}
          size="lg"
          className={
            isSecret ? "project-form__secret-icon" : "project-form__icon"
          }
          onClick={handleSecretProject}
        />
      </div>
      <div className="project-form__item">
        <label htmlFor="date">Project Launch Date</label>
        <input id="date" type="date" className="project-form__input" required />
      </div>
      <button type="button" className="project-form__button">
        Kick Off
      </button>
    </form>
  );
};

export default ProjectForm;
