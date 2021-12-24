import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createATask } from "../../utilities/apiRequests";

const AddTask = (props) => {
  const history = useHistory();
  const params = useParams();
  // get teams list from react router Link
  const location = useLocation();
  console.log(location.state);
  let teams = location.state.teams;
  let teamList = teams.reduce((acc, cur) => {
    return [...acc, { id: cur.id, name: cur.name, isChecked: false }];
  }, []);

  //set up checkbox
  const [checkboxData, setCheckboxData] = useState(teamList);
  const checkboxChangeCheck = (id) => {
    let temp = [...checkboxData];
    const index = temp.findIndex((option) => option.id === id);
    if (index === -1) return;
    temp[index].isChecked = !temp[index].isChecked;
    setCheckboxData(temp);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let neededCheckboxValue = [];
    checkboxData.forEach((item) => {
      if (item.isChecked === true) {
        neededCheckboxValue.push(item.id);
      }
    });
    let newTask = {
      isComplete: false,
      isLaunchDay: false,
      targetDate: e.target.date.value,
      teams: neededCheckboxValue,
      title: e.target.title.value,
    };
    console.log(newTask);
    createATask(params.id, newTask).then(() => {
      history.push(`/project/${params.id}`);
    });
    e.target.reset();
  };

  return (
    <main className="">
      <p onClick={handleCancel} className="">
        &lt; Back
      </p>
      <h1 className=""> Add Task</h1>

      <form className="" onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="task" className="">
            Task
          </label>
          <input type="text" className="" name="title" id="task" />
        </div>

        <div className="">
          <p className=""> Team(s): </p>
          <div>
            {checkboxData.map((task) => (
              <div key={task.id}>
                <input
                  id={task.name}
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => {
                    checkboxChangeCheck(task.id);
                  }}
                />
                <label htmlFor={task.name}>{task.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <label htmlFor="targetDate" className="">
            Target Date
          </label>
          <input type="date" className="" name="date" id="targetDate" />
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

export default AddTask;
