import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/mongodb";
export async function GET(req: Request, res: Response) {
  const user = await currentUser();
  const details = await CheckForDetails(user?.primaryEmailAddressId);
  return Response.json({ details });
}

type params = string | null | undefined;
async function CheckForDetails(id: params) {
  await client.connect();
  const database = client.db("referral");
  const collection = await database
    .collection("users")
    .find({ emailId: id })
    .toArray();
  await client.close();
  if (collection.length) return collection[0];
  return false;
}
