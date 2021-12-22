import React from "react";
import { useHistory } from "react-router-dom";

const AddTask = () => {
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
      <h1 className=""> Add Task</h1>

      <form className="">
        <section className="">
          <label htmlFor="task" className="">
            Task
          </label>
          <input type="text" className="" name="text" />
        </section>

        <section className="">
          <p className=""> Team(s): </p>
          <div>
            <div>
              <input type="checkbox" id="goldenFish " />
              <label htmlFor="goldenFish">Golden Fish</label>
            </div>
            <div>
              <input type="checkbox" id="shark" />
              <label htmlFor="shark">Shark</label>
            </div>
            <div>
              <input type="checkbox" id="shellFish " />
              <label htmlFor="shellFish">Shell Fish</label>
            </div>
          </div>
        </section>

        <section className="">
          <label htmlFor="targetDate" className="">
            Target Date
          </label>
          <input type="date" className="" name="date" />
        </section>

        <section className="">
          <label htmlFor="status" className="">
            Status
          </label>
          <select id="status" className="">
            <option value="progressing">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </section>

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

export default AddTask;
