import { Request, Response } from "express";
import { getCollections } from "../db/mongoDB.collections.db";

const getInspectionHandler = async (req: Request, res: Response) => {
  console.log("request in");
  const { inspectionType } = req.query;
  const records = await getCollections("InspectionRecords", { inspectionType });
  res.json(records);
  //   let dbConnect = getDb();
  //   const records = await dbConnect
  //     .collection("InspectionRecords")
  //     .find({})
  //     .toArray();
  //   res.json(records);
  return;
};

export { getInspectionHandler };
