import { client } from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  await client.connect();
  const database = client.db("sample_mflix");
  const collection = await database.collection("movies").find({}).toArray();
  console.log(collection);
  await client.close();
  return Response.json("Successs");
}
