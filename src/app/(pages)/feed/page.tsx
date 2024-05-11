import Post from "@/components/post";
import { redirect } from "next/navigation";
import { client } from "@/lib/mongodb";
import Details from "@/components/detailsForm";
import PostCardsList from "@/components/postCardsList";
import { currentUser } from "@clerk/nextjs/server";
import Filters from "@/components/filters";

export default async function Feed() {
  const user = await currentUser();

  const details = await CheckForDetails(user?.primaryEmailAddressId);

  if (!user) {
    redirect("/sign-in");
  }

  if (!details) {
    return <Details username={user.firstName ?? ""} mode="Submit Details" />;
  }

  return (
    <div className="mt-20">
      <Filters></Filters>
      <Post />
      <PostCardsList />
    </div>
  );
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
