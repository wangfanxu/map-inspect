import { getDb } from "../db/conn";

const getCollections = async (collectionName: string, queryParams: any) => {
  let dbConnect = getDb();

  return dbConnect
    .collection(collectionName)
    .find({
      ...queryParams,
    })
    .toArray();
};

export { getCollections };
