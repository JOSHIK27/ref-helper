import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
export default async function Nav() {
  const user = await currentUser();
  return (
    <div className="bg-white shadow-md h-12 flex justify-evenly items-center">
      <span>Home</span>
      <span>Home</span>
      <span>Chat</span>
      {user ? (
        <SignOutButton>
          <img
            src={user?.imageUrl}
            className="rounded-full w-[32px] cursor-pointer"
          ></img>
        </SignOutButton>
      ) : (
        <SignInButton>
          <Button variant={"secondary"}>Login</Button>
        </SignInButton>
      )}
    </div>
  );
}
