import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
export default async function Nav() {
  const user = await currentUser();
  return (
    <div className="bg-white shadow-md h-12 flex justify-evenly items-center">
      <Link href={"../"}>
        <Button variant={"ghost"}>Home</Button>
      </Link>
      <Button variant={"ghost"}>Home</Button>
      <Button variant={"ghost"}>Chat</Button>
      {user ? (
        <SignOutButton>
          <img
            src={user?.imageUrl}
            className="rounded-full w-[32px] cursor-pointer"
          ></img>
        </SignOutButton>
      ) : (
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      )}
    </div>
  );
}
