import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Post from "@/components/post";
import PostCardsList from "@/components/postCardsList";
import { client } from "@/lib/mongodb";

export default async function Page() {
  const user = await currentUser();
  const postsList = await getAllPosts();

  const temp = postsList.map((item) => {
    return {
      role: item.role,
      proof: item.proof,
      imageUrl: item.imageUrl,
      visaExpiry: item.visaExpiry,
      name: item.name,
      education: item.education,
      experience: item.experience,
      country: item.country,
      type: "Delete",
    };
  });
  const updatedPostList = temp.filter((item) => {
    if (item.name == user?.firstName) return true;
    return false;
  });

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <PostCardsList postsList={updatedPostList} />
    </>
  );
}

async function getAllPosts() {
  await client.connect();
  const database = client.db("referral");
  const collection = await database.collection("posts").find({}).toArray();
  await client.close();
  return collection;
}
