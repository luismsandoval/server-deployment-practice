const { DataTypes } = require("sequelize");

function survivor(db) {
  return db.define("Survivor", {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    strengths: DataTypes.STRING,
    weaknesses: DataTypes.STRING,
    powerLevel: DataTypes.INTEGER,
  });
}

module.exports = { survivor };
