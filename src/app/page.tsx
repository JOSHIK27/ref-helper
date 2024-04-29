import Post from "@/components/post";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { client } from "@/lib/mongodb";
import Details from "@/components/detailsForm";

export default async function Home() {
  const user = await currentUser();
  const response = await clerkClient.users.getUserList();
  const details = await CheckForDetails(
    response?.data[0].primaryEmailAddressId
  );

  if (!user) {
    redirect("/sign-up");
  }
  if (!details) {
    return <Details />;
  }
  return (
    <>
      <Post />
    </>
  );
}

type params = string | null;
async function CheckForDetails(id: params) {
  await client.connect();
  const database = client.db("referral");
  const collection = await database
    .collection("users")
    .find({ emailId: id })
    .toArray();
  await client.close();
  console.log(collection);
  if (collection.length) return true;
  return false;
}
