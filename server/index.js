const express = require("express");
const projectRouter = require("./routes/project");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/project", projectRouter);

app.listen(8080, () => console.log("🚀 Launching on PORT 8080 "));
