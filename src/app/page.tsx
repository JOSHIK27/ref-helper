import Post from "@/components/post";
import { currentUser } from "@clerk/nextjs/server";
import Country from "@/components/country";
import { clerkClient } from "@clerk/nextjs/server";
export default async function Home() {
  const user = await currentUser();
  const response = await clerkClient.users.getUserList();
  console.log(response);
  if (!user) {
    return <Country />;
  }
  return (
    <>
      <Post />
    </>
  );
}
