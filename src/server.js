"use strict";

const express = require("express");
const { logger } = require("./middleware/logger");
const { validator } = require("./middleware/validator");
const { db } = require("./db");

require("./db");

const hello = (req, res) => {
  res.status(200).send("Hello, World");
};
// const notFound = (req, res) => {
//   res.status(404).send("Not-Found");
// };
const serverError = (req, res) => {
  res.status(500).send("Server Error");
};

const data = (req, res) => {
  res.status(200).send({
    name: "Luis",
    role: "Student",
  });
};

const name = (req, res) => {
  res.status(200).send({ name: req.params.name });
};

const {
  createSurvivor,
  listSurvivors,
  getSurvivor,
  deleteSurvivor,
  updateSurvivor,
} = require("./routes/survivor");

const {
  createCalamity,
  listCalamities,
  getCalamity,
  deleteCalamity,
  updateCalamity,
} = require("./routes/calamity");

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", hello);
// app.get("*", notFound);
app.get("/data", data);
app.get("/person/:name", validator, name);
app.get("/person/", serverError);

// survivor CRUD

app.get("/survivor", listSurvivors);
app.post("/survivor", createSurvivor);
app.get("/survivor/:id", getSurvivor);
app.delete("/survivor/:id", deleteSurvivor);
app.put("/survivor/:id", updateSurvivor);

// calamity CRUD

app.get("/calamity", listCalamities);
app.post("/calamity", createCalamity);
app.get("/calamity/:id", getCalamity);
app.delete("/calamity/:id", deleteCalamity);
app.put("/calamity/:id", updateCalamity);

const shouldSyncOnStart = true;
async function start(port) {
  if (shouldSyncOnStart /* todo define this somewhere */) {
    await db.sync();
  }
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

module.exports = {
  app,
  start,
};
