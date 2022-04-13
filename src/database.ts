import { MongoClient, Db } from "mongodb";
const MONGO_URL = process.env.MONGO_DATABASE_URL || "";

let cachedDb: Db = null;

export function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGO_URL).then((client) => {
    cachedDb = client.db();
    return cachedDb;
  });
}
