import express from "express";
// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn";
import { getInspectionHandler } from "../handlers/inspection.handler";
import { validateQueryParams } from "../middlewares/request.middlware";
// This section will help you get a list of all the records.
const recordRoutes = express.Router();

recordRoutes.route("/inspections").get(
  // This middleware validates the query params
  (req, res, next) => validateQueryParams(req, res, next, ["inspectionType"]),
  getInspectionHandler
);

// // This section will help you get a single record by id
// recordRoutes.route("/records/:id").get(function (req, res) {
//   let db_connect = getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   const record = db_connect.collection("records").findOne(myquery);
//   res.json(record);
// });

// // This section will help you create a new record.
// recordRoutes.route("/records").post(async function (req, response) {
//   let db_connect = getDb();
//   let record = {
//     name: req.body.name,
//     position: req.body.position,
//     level: req.body.level,
//   };
//   await db_connect.collection("records").insertOne(record);
//   response.json(record);
// });

export default recordRoutes;
