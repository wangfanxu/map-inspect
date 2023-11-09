import { getDb } from "../db/conn";

const getCollections = async (
  collectionName: string,
  queryParams: any,
  limits: any
) => {
  let dbConnect = getDb();

  return dbConnect
    .collection(collectionName)
    .find({
      ...queryParams,
    })
    .skip(Number(limits.offset))
    .limit(Number(limits.limit))
    .toArray();
};

export { getCollections };
