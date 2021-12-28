import axios from "axios";

//edit a project
export const editProject = async function EditProjectInfo(projectId, changes) {
  let data;
  try {
    let response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/edit`,
      changes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

// create a new project
export const createProject = async function postProject(project) {
  let response;
  let data;
  try {
    response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/project/`,
      project
    );
    data = response.data;
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

// get target project info
export const getTargetProject = async function getAProject(id) {
  let response;
  let data;
  try {
    response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/project/${id}`
    );
    data = await response.data;
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

//edit a task info
export const editTask = async function EditTaskInfo(
  projectId,
  taskId,
  changes
) {
  let data;
  try {
    let response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/tasks/${taskId}/edit`,
      changes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

//edit a team info
export const editTeam = async function EditTeamInfo(
  projectId,
  teamId,
  changes
) {
  let data;
  try {
    let response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/teams/${teamId}/edit`,
      changes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

// create a new team
export const addNewTeam = async function createTeam(
  id,
  teamAvatar,
  teamDescription,
  teamName,
  teamRole
) {
  let response;
  let data;
  try {
    let formData = new FormData();
    formData.append("avatar", teamAvatar);
    formData.append("description", teamDescription);
    formData.append("name", teamName);
    formData.append("role", teamRole);
    response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/project/${id}/teams`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    data = response.data;
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  console.log(data);
  return data;
};

//delete a team
export const deleteATeam = async function deleteTeam(projectId, teamId) {
  let data;
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/teams/${teamId}`
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

//create a task
export const createATask = async function addTask(projectId, newTask) {
  let data;
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/tasks`,
      newTask
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};

//delete a task
export const deleteATask = async function deleteTask(projectId, taskId) {
  let data;
  try {
    let response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/project/${projectId}/tasks/${taskId}`
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.log(e);
    alert("something went wrong");
  }
  return data;
};
