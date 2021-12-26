import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addNewTeam } from "../../utilities/apiRequests";
import "./AddTeam.scss";

const AddTeam = () => {
  const [avatar, setAvatar] = useState(null);

  const history = useHistory();
  const params = useParams();

  const handleCancel = () => {
    history.goBack();
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addNewTeam(
      params.id,
      avatar,
      e.target.description.value,
      e.target.teamName.value,
      e.target.role.value
    ).then(() => {
      history.push(`/project/${params.id}`);
    });
    e.target.reset();
  };

  return (
    <main className="add">
      <p onClick={handleCancel} className="add__back">
        &lt; Back
      </p>
      <h1 className="add__title"> Add Team</h1>

      <form className="team-form" onSubmit={handleFormSubmit}>
        <div className="team-form__items">
          <label htmlFor="teamName" className="team-form__label">
            Team Name:
          </label>
          <input
            type="text"
            className="team-form__input"
            id="teamName"
            name="teamName"
            required
          />
        </div>

        <div className="team-form__items">
          <label htmlFor="description" className="team-form__label">
            Description:
          </label>
          <input
            type="text"
            className="team-form__input"
            id="description"
            name="description"
            required
          />
        </div>

        <div className="team-form__items">
          <label htmlFor="avatar" className="team-form__label">
            Team Avatar:
            <div className="team-form__box">
              <img
                className="team-form__avatar"
                src="https://via.placeholder.com/150"
                alt="avatar"
              />
            </div>
          </label>
          <input type="file" id="avatar" onChange={handleFileChange} />
        </div>

        <div className="team-form__role">
          <label htmlFor="role" className="team-form__label">
            Role:
          </label>
          <select id="role" name="role" required>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">UX/UI Design</option>
            <option value="billing">Billing Team</option>
            <option value="marketing">Marketing Team</option>
          </select>
        </div>

        <div className="team-form__buttons">
          <button
            className="team-form__cancel"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
          <button className="team-form__save">Save</button>
        </div>
      </form>
    </main>
  );
};

export default AddTeam;
