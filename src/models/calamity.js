const { DataTypes } = require("sequelize");

function calamity(db) {
  return db.define(
    "Calamity",
    {
      type: DataTypes.STRING,
      intensity: DataTypes.INTEGER,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      tableName: "Calamities",
    }
  );
}

module.exports = { calamity };
