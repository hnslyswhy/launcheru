import axios from "axios";

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
      `${process.env.REACT_APP_SERVER_URL}/project/${id}/addteam`,
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
