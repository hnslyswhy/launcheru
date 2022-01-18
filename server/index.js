const express = require("express");
const projectRouter = require("./routes/project");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/project", projectRouter);

app.listen(PORT, () => console.log(`🚀 Launching on ${PORT}`));
