import { client } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request, res: Response) {
  const { username, education, visaExpiry, country, field, experience, file } =
    await req.json();
  const user = await currentUser();
  await client.connect();
  const database = client.db("referral");
  const { acknowledged } = await database.collection("users").insertOne({
    username,
    education,
    visaExpiry,
    country,
    field,
    experience,
    file,
    emailId: user?.primaryEmailAddressId,
    imageUrl: user?.imageUrl,
  });
  await client.close();
  if (!acknowledged) return Response.json({ success: false });
  return Response.json({ success: true });
}

export async function PUT(req: Request, res: Response) {
  const { username, education, visaExpiry, country, field, experience, file } =
    await req.json();
  const user = await currentUser();
  await client.connect();
  const database = client.db("referral");
  const { acknowledged } = await database.collection("users").updateOne(
    { username: username },
    {
      $set: {
        username,
        education,
        visaExpiry,
        country,
        field,
        experience,
        file,
        emailId: user?.primaryEmailAddressId,
        imageUrl: user?.imageUrl,
      },
    }
  );
  await client.close();
  if (!acknowledged) return Response.json({ success: false });
  return Response.json({ success: true });
}
