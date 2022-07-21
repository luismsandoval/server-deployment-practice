const { Calamity } = require("../db");

const createCalamity = async (req, res) => {
  const { type, intensity, location, date } = req.body;

  const calamity = Calamity.build({
    type,
    intensity,
    location,
    date,
  });

  await calamity.save();

  res.status(201).send(calamity);
};

const listCalamities = async (req, res) => {
  const calamities = await Calamity.findAll();

  res.status(200).send(calamities);
};

const getCalamity = async (req, res) => {
  const calamities = await Calamity.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (calamities.length > 0) {
    res.status(200).send(calamities[0]);
  } else {
    res.status(404).send(`Could not find calamity with id ${req.params.id}`);
  }
};

const deleteCalamity = async (req, res) => {
  await Calamity.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).send("calamity deleted");
};

const updateCalamity = async (req, res) => {
  await Calamity.update(
    {
      type: req.query.type,
      intensity: req.query.intensity,
      location: req.query.location,
      date: req.query.date,
    },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    }
  );

  res.status(200).send("calamity updated");
};

module.exports = {
  createCalamity,
  listCalamities,
  getCalamity,
  deleteCalamity,
  updateCalamity,
};
