import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { editProject } from "../../utilities/apiRequests";

const EditProject = () => {
  const history = useHistory();
  const location = useLocation();
  let name = location.state.name;
  let launchDate = location.state.launchDate;
  let id = location.state.id;
  console.log(name, launchDate);

  const handleCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let changes = {
      name: e.target.name.value,
      launchDate: e.target.launchDate.value,
    };
    e.target.reset();
    editProject(id, changes)
      .then(() => {
        history.push(`/project/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <main className="project-edit">
      <p onClick={handleCancel} className="project-edit__back">
        &lt; Back
      </p>
      <h1 className="project-edit__title"> Edit Project</h1>

      <form className="project-form" onSubmit={handleFormSubmit}>
        <div className="project-form__items">
          <label htmlFor="name" className="project-form__label">
            Project Name:
          </label>
          <input
            type="text"
            className="project-form__input"
            name="name"
            id="name"
            defaultValue={name}
          />
        </div>

        <div className="project-form__items">
          <label htmlFor="targetDate" className="project-form__label">
            Launch Date:
          </label>
          <input
            type="date"
            className="project-form__input"
            name="launchDate"
            id="launchDate"
            defaultValue={launchDate}
          />
        </div>
        <div className="project-form__buttons">
          <button onClick={handleCancel} type="button">
            Cancel
          </button>
          <button>Save</button>
        </div>
      </form>
    </main>
  );
};

export default EditProject;
