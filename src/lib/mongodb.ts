import { MongoClient } from "mongodb";

export const client = new MongoClient(
  process.env.NEXT_PUBLIC_MONGODB_URL || ""
);
