const express = require("express");
const projectRouter = require("./routes/project");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.use("/project", projectRouter);

app.listen(process.env.PORT, () => console.log("🚀 Launching on PORT 8080 "));

/******************* mongo starts***************************/
/* const { MongoClient } = require("mongodb");
//create a constant for our connection URI. The connection URI
async function main() {
  const uri =
    "mongodb+srv://hnslyswhy:47r8FLXi7k47@cluster0.5mivt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
    await createProject(client, {
      name: "my cozy home",
      bedroom: "3",
    }); 
    await createMultiProject(client, [
      { name: "conzy home", location: ["china", "henan"] },
      { name: "luxry hotel", equipment: ["heater", "ac"] },
      { name: "cheap hotel" },
    ]);
    await findAProject(client, "cheap hotel");
    await updateAProject(client, "cheap hotel", { bedrooms: 6 });
    await upsertATaskByName(client, "top 3 choices in Tailand", {
      name: "top 3 choices in Tailand",
      Bedroom: 6,
    });
    await updateAllProjectToHaveBedroom(client);
    await deletedAProject(client, "cozy cottage");
    await deletedManyMoreThanFiveBedroom(client, 2);
  } catch (e) {
    console.error(e);
  } finally {
    // close the connection to our cluster,
    await client.close();
  }
}
// call main function. send the errors to the console.
main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
} 

async function createProject(client, newProject) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newProject);
  console.log(
    `new listing created with the following id: ${result.insertedId}`
  );
}

async function createMultiProject(client, newProjects) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newProjects);
  console.log(`new listings count: ${results.insertedCount}`);
}

async function findAProject(client, nameOfProject) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfProject });

  if (result) {
    console.log(`found ${result}`);
  } else {
    console.log("not found");
  }
}

async function findProjects(client, {minBedroom = 0, minBathroom = 0}) // check her github for code


async function updateAProject(client, nameOfProject, updatedProject) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne(
      { name: nameOfProject },
      {
        $set: updatedProject,
      }
    );
  console.log(result);
}

async function upsertATaskByName(client, nameofTask, updatedTasks) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateOne({ name: nameofTask }, { $set: updatedTasks }, { upsert: true });

  console.log(results);
  if (results.upsertedCount > 0) {
    console.log(`one document was inserted with id ${results.upsertedId}`);
  }
}

async function updateAllProjectToHaveBedroom(client) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .updateMany(
      { Bedroom: { $exists: false } },
      { $set: { Bedroom: "unknown" } }
    );

  console.log(`${result.matchedCount} were updated`);
}

async function deletedAProject(client, nameOfProject) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteOne({ name: nameOfProject });

  console.log(`${result.deletedCount} were deleted`);
}

async function deletedManyMoreThanFiveBedroom(client, bedrooms) {
  const results = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .deleteMany({ Bedrooms: { $lt: bedrooms } });

  console.log(`${results.deletedCount} were deleted`);
} */
/******************* mongo ends ***************************/
