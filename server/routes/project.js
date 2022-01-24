const express = require("express");
const { v4: uuidv4 } = require("uuid");
//for upload files
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
//for fake data
const projectData = require("../data/data.json");
const fs = require("fs");
require("dotenv").config();

const projectRouter = express.Router();
const app = express();
const s3 = new aws.S3({
    endpoint: process.env.SPACES_ENDPOINT,
    region: "us-east-1",
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'happyaviationenglish/launcheru/teamicons',
    acl: function (req, file, cb) {
      cb(null, "public-read");
    },
    ContentType: function (req, file, cb) {
      cb(null, file.mimeType);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.originalname, "Content-Type": file.mimetype });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    }
  })
});

//edit project name/launchdate
projectRouter.patch("/:id/edit", (req, res) => {
  const targetProjectId = req.params.id;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find(
    (project) => project.id === targetProjectId
  );
  if (targetProject) {
    targetProject.name = req.body.name;
    targetProject.launchDate = req.body.launchDate;
    fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
    res.status(200).send(targetProject);
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

// delete a task
projectRouter.delete("/:id/tasks/:taskId", (req, res) => {
  const targetProjectId = req.params.id;
  const targetTaskId = req.params.taskId;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find(
    (project) => project.id === targetProjectId
  );
  let targetTask;
  if (targetProject) {
    targetTask = targetProject.todos.find((task) => task.id === targetTaskId);
    if (targetTask) {
      targetProject.todos = targetProject.todos.filter(
        (task) => task.id !== targetTaskId
      );
      fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
      res.status(200).send(targetProject.todos);
    } else {
      res.status(400).json({ message: "task not found" });
    }
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

//edit a task
projectRouter.patch("/:id/tasks/:taskId/edit", (req, res) => {
  const targetProjectId = req.params.id;
  const targetTaskId = req.params.taskId;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find(
    (project) => project.id === targetProjectId
  );
  let targetTask;
  console.log(req.body.teams);
  if (targetProject) {
    targetTask = targetProject.todos.find((task) => task.id === targetTaskId);
    if (targetTask) {
      targetTask.isComplete = req.body.isComplete;
      targetTask.title = req.body.title;
      targetTask.targetDate = req.body.targetDate;
      if (req.body.teams.length !== 0) {
        targetTask.teams = req.body.teams;
      }
      fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
      res.status(200).send(targetTask);
    } else {
      res.status(400).json({ message: "task not found" });
    }
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

// add new task to target project
projectRouter.post("/:id/tasks", (req, res) => {
  const targetId = req.params.id;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find((project) => project.id === targetId);
  if (targetProject) {
    let currentTasks = targetProject.todos;
    let newTask = { id: uuidv4(), ...req.body };
    let updatedTasks = [newTask, ...currentTasks];
    targetProject.todos = updatedTasks;
    fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
    res.status(200).send(updatedTasks);
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

// delete a team
projectRouter.delete("/:id/teams/:teamId", (req, res) => {
  const targetProjectId = req.params.id;
  const targetTeamId = req.params.teamId;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find(
    (project) => project.id === targetProjectId
  );
  let targetTeam;
  if (targetProject) {
    targetTeam = targetProject.teams.find((team) => team.id === targetTeamId);
    if (targetTeam) {
      targetProject.teams = targetProject.teams.filter(
        (team) => team.id !== targetTeamId
      );
      fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
      res.status(200).send(targetProject.teams);
    } else {
      res.status(400).json({ message: "team not found" });
    }
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

//edit a team
projectRouter.patch(
  "/:id/teams/:teamId/edit",
  upload.single("avatar"),
  (req, res) => {
    const targetProjectId = req.params.id;
    const targetTeamId = req.params.teamId;
    let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
    let targetProject = projectList.find(
      (project) => project.id === targetProjectId
    );
    let targetTeam;
    if (targetProject) {
      targetTeam = targetProject.teams.find((team) => team.id === targetTeamId);
      if (targetTeam) {
        targetTeam.name = req.body.name;
        targetTeam.role = req.body.role;
        if (req.file) {
           targetTeam.avatar = `https://happyaviationenglish.sfo3.digitaloceanspaces.com/launcheru/teamicons/${req.file.key}`; 
        }
        targetTeam.description = req.body.description;
        fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
        res.status(200).send(targetTeam);
      } else {
        res.status(400).json({ message: "team not found" });
      }
    } else {
      res.status(400).json({ message: "project not found" });
    }
  }
);

//add new team to target project
projectRouter.post("/:id/teams", upload.single("avatar"), (req, res) => {
  const targetId = req.params.id;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find((project) => project.id === targetId);
  let newTeam = {
    id: uuidv4(),
    avatar: `https://happyaviationenglish.sfo3.digitaloceanspaces.com/launcheru/teamicons/${req.file.key}`, 
    description: req.body.description,
    name: req.body.name,
    role: req.body.role,
  };
  if (targetProject) {
    const currentTeams = targetProject.teams;
    let updatedTeams = [...currentTeams, newTeam];
    targetProject.teams = updatedTeams;
    fs.writeFileSync("./data/data.json", JSON.stringify(projectList));
    res.status(200).send(updatedTeams);
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

// get target project info
projectRouter.get("/:id", (req, res) => {
  const targetId = req.params.id;
  let projectList = JSON.parse(fs.readFileSync("./data/data.json"));
  let targetProject = projectList.find((project) => project.id === targetId);
  if (targetProject) {
    res.status(200).send(targetProject);
  } else {
    res.status(400).json({ message: "project not found" });
  }
});

// create a new project
projectRouter.post("/", (req, res) => {
  console.log(req.body);

  if (!req.body) {
    res.status(400).json({
      message:
        "please include all the required information for setting up a project",
    });
  }
  try {
    let currentProjectList = JSON.parse(fs.readFileSync("./data/data.json"));
    let newProject = { id: uuidv4(), ...req.body };
    let updatedProjectList = currentProjectList.concat([newProject]);
    fs.writeFileSync("./data/data.json", JSON.stringify(updatedProjectList));
    res.status(200).send(newProject);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "something went wrong" });
  }
});

module.exports = projectRouter;
