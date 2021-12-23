import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addNewTeam } from "../../utilities/apiRequests";

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
    <main className="">
      <p onClick={handleCancel} className="">
        &lt; Back
      </p>
      <h1 className=""> Add Team</h1>

      <form className="" onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="teamName" className="">
            Team Name
          </label>
          <input
            type="text"
            defaultValue="test"
            className=""
            id="teamName"
            name="teamName"
          />
        </div>

        <div className="">
          <label htmlFor="role" className="">
            Role
          </label>
          <select id="role" className="" name="role">
            <option value="frontend" selected>
              Frontend
            </option>
            <option value="backend">Backend</option>
            <option value="design">UX/UI Design</option>
            <option value="billing">Billing Team</option>
            <option value="marketing">Marketing Team</option>
          </select>
        </div>

        <div className="">
          <label htmlFor="description" className="">
            Description
          </label>
          <input
            type="text"
            className=""
            defaultValue="test"
            id="description"
            name="description"
          />
        </div>

        <div className="">
          <label htmlFor="avatar" className="">
            Team Avatar
            <div></div>
          </label>
          <input type="file" id="avatar" onChange={handleFileChange} />
        </div>

        <div className="">
          <button className="" onClick={handleCancel} type="button">
            Cancel
          </button>
          <button className="">Save</button>
        </div>
      </form>
    </main>
  );
};

export default AddTeam;
