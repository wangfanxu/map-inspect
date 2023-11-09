import { Request, Response } from "express";
import { getCollections } from "../db/mongoDB.collections.db";

const getInspectionHandler = async (req: Request, res: Response) => {
  const { inspectionType, block, estate, inspector, offset, limit } = req.query;
  // Create an object with only defined parameters
  const queryParams = {};
  const limits = { offset, limit };
  if (inspectionType) Object.assign(queryParams, { inspectionType });
  if (block) Object.assign(queryParams, { block });
  if (estate) Object.assign(queryParams, { estate });
  if (inspector) Object.assign(queryParams, { inspector });

  const records = await getCollections(
    "InspectionRecords",
    queryParams,
    limits
  );
  res.json(records);

  return;
};

export { getInspectionHandler };
