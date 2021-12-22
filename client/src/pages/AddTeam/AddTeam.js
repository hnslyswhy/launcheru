import React from "react";
import { useHistory } from "react-router-dom";

const AddTeam = () => {
  const history = useHistory();

  const handleCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
          <input type="text" className="" id="teamName" name="teamName" />
        </div>

        <div className="">
          <label htmlFor="avatar" className="">
            Team Icon
            <div></div>
          </label>
          <input type="file" id="avatar" />
        </div>

        <div className="">
          <label htmlFor="role" className="">
            Role
          </label>
          <select id="role" className="" name="role">
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="design">UX/UI Design</option>
            <option value="billing">Billing Team</option>
            <option value="marketing">Marketing Team</option>
          </select>
        </div>

        <section className="">
          <button className="" onClick={handleCancel} type="button">
            Cancel
          </button>
          <button className="" type="button">
            Save
          </button>
        </section>
      </form>
    </main>
  );
};

export default AddTeam;
