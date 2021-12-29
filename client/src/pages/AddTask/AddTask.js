import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createATask, editTask } from "../../utilities/apiRequests";
import "./AddTask.scss";

const AddTask = (props) => {
  const history = useHistory();
  const params = useParams();
  // get teams list from react router Link
  const location = useLocation();
  let teams = location.state.teams;
  let type = location.state.type;
  let taskId;
  let taskTitle;
  let taskTargetDate;
  if (type === "edit") {
    taskId = location.state.task.id;
    taskTitle = location.state.task.title;
    taskTargetDate = location.state.task.targetDate;
  }

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
    if (type === "add") {
      createATask(params.id, newTask).then(() => {
        history.push(`/project/${params.id}`);
      });
    }

    if (type === "edit") {
      editTask(params.id, taskId, {
        targetDate: e.target.date.value,
        teams: neededCheckboxValue,
        title: e.target.title.value,
      }).then(() => {
        history.push(`/project/${params.id}`);
      });
    }
    e.target.reset();
  };

  return (
    <main className="add">
      <p onClick={handleCancel} className="add__back">
        &lt; Back
      </p>
      <h1 className="add__title">
        {type === "add" ? "Add Task" : "Edit Task"}
      </h1>

      <form className="task-form" onSubmit={handleFormSubmit}>
        <div className="task-form__items">
          <label htmlFor="task" className="task-form__label">
            Task Name:
          </label>
          <input
            type="text"
            className="task-form__input"
            name="title"
            id="task"
            defaultValue={taskTitle}
            required
          />
        </div>

        <div className="task-form__items">
          <label htmlFor="targetDate" className="task-form__label">
            Target Date:
          </label>
          <input
            type="date"
            className="task-form__input"
            name="date"
            id="targetDate"
            defaultValue={taskTargetDate}
            required
          />
        </div>

        <div className="task-form__items">
          <p className=""> Team(s) Involved: </p>
          <div className="task-form__check-container">
            {checkboxData.map((task) => (
              <div key={task.id} className="task-form__checkbox">
                <input
                  id={task.name}
                  className="task-form__checkbox-input"
                  type="checkbox"
                  checked={task.isChecked}
                  onChange={() => {
                    checkboxChangeCheck(task.id);
                  }}
                />
                <label
                  htmlFor={task.name}
                  className="task-form__checkbox-label"
                >
                  {task.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="task-form__buttons">
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
