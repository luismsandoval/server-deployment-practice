const { Sequelize } = require("sequelize");
const { survivor } = require("./models/survivor");
const { calamity } = require("./models/calamity");

// Get the database connection
// const db = new Sequelize("sqlite::memory:");
let connection_string;
switch (process.env.NODE_ENV) {
  case "production":
    connection_string = process.env.DATABASE_URL;
    break;
  case "dev":
    connection_string = "sqlite::memory:";
    break;
  case "staging":
  default:
    connection_string = `sqlite:${process.env.SQLITE_FILE ?? "../db"}`;
    break;
}

const db = new Sequelize(connection_string, {
  // For postgres only
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// IN DEVELOPMENT ONLY!
// db.sync();

module.exports = {
  db,
  Survivor: survivor(db),
  Calamity: calamity(db),
};
