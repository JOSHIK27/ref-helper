import Post from "@/components/post";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { client } from "@/lib/mongodb";
import Details from "@/components/detailsForm";
import PostCardsList from "@/components/postCardsList";
import { CheckForDetails } from "@/lib/utils";
export default async function Feed() {
  const user = await currentUser();
  const postsList = await getAllPosts();

  const updatedPostList = postsList.map((item) => {
    return {
      role: item.role,
      proof: item.proof,
      imageUrl: item.imageUrl,
      visaExpiry: item.visaExpiry,
      name: item.name,
      education: item.education,
      experience: item.experience,
      country: item.country,
    };
  });

  const details = await CheckForDetails(user?.primaryEmailAddressId);

  if (!user) {
    redirect("/sign-in");
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

async function getAllPosts() {
  await client.connect();
  const database = client.db("referral");
  const collection = await database.collection("posts").find({}).toArray();
  await client.close();
  return collection;
}
