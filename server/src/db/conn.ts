// const { MongoClient } = require("mongodb");
import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const dbLink = process.env.ATLAS_URI;
const client = new MongoClient(dbLink, {
  monitorCommands: true,
});

let _db: Db;

const connectToServer = async () => {
  const dbConnection = await client.connect();
  // _db = dbConnection
  _db = dbConnection.db("Plantation");
  console.log("Successfully connected to MongoDB.");
};

const getDb = () => {
  console.log("db", _db);
  return _db;
};

export { connectToServer, getDb };
