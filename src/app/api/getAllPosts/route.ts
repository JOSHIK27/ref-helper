import { client } from "@/lib/mongodb";
export async function GET(req: Request, res: Response) {
  const posts = await getAllPosts();
  return Response.json({ posts });
}

async function getAllPosts() {
  await client.connect();
  const database = client.db("referral");
  const collection = await database.collection("posts").find({}).toArray();
  await client.close();
  return collection;
}
