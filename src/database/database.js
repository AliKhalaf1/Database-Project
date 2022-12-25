const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();
const connectionString = process.env.DB_URI;
const client = new Pool({
  connectionString,
});

client.on("error", (error) => {
  console.error(error.message);
});
module.exports = client;
