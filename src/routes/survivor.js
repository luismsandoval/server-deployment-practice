const { Survivor } = require("../db");

const createSurvivor = async (req, res) => {
  const { username, birthday, strengths, weaknesses, powerLevel } = req.body;

  const survivor = Survivor.build({
    username,
    birthday,
    strengths,
    weaknesses,
    powerLevel,
  });

  await survivor.save();

  res.status(200).send(survivor);
};

const listSurvivors = async (req, res) => {
  const survivors = await Survivor.findAll();

  res.status(200).send(survivors);
};

const getSurvivor = async (req, res) => {
  const survivors = await Survivor.findAll({
    where: {
      id: req.params.id,
    },
  });

  if (survivors.length > 0) {
    res.status(200).send(survivors[0]);
  } else {
    res.status(404).send(`Could not find survivor with id ${req.params.id}`);
  }
};

const deleteSurvivor = async (req, res) => {
  await Survivor.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).send("survivor deleted");
};

const updateSurvivor = async (req, res) => {
  await Survivor.update(
    {
      username: req.query.username,
      birthday: req.query.birthday,
      strengths: req.query.strengths,
      weaknesses: req.query.weaknesses,
      powerLevel: req.query.powerLevel,
    },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
    }
  );

  res.status(200).send("survivor updated");
};

module.exports = {
  createSurvivor,
  listSurvivors,
  getSurvivor,
  deleteSurvivor,
  updateSurvivor,
};
