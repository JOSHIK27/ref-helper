import Post from "@/components/post";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { client } from "@/lib/mongodb";
import Details from "@/components/detailsForm";

import PostCardsList from "@/components/postCardsList";
export default async function Home() {
  const user = await currentUser();
  const response = await clerkClient.users.getUserList();
  const postsList = await getAllPosts();

  const updatedPostList = postsList.map((item) => {
    return {
      role: item.role,
      proof: item.proof,
      imageUrl: item.imageUrl,
      visaExpiry: item.visaExpiry,
    };
  });

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
      <PostCardsList postsList={updatedPostList} />
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
  if (collection.length) return true;
  return false;
}

async function getAllPosts() {
  await client.connect();
  const database = client.db("referral");
  const collection = await database.collection("posts").find({}).toArray();
  await client.close();
  return collection;
}
