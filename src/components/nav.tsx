import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default async function Nav() {
  const user = await currentUser();
  return (
    <div className="bg-white shadow-md h-12 flex lg:justify-evenly items-center">
      <SheetSide />
      <div className="hidden lg:flex">
        <Link href={"../"}>
          <Button className="mr-40" variant={"ghost"}>
            Home
          </Button>
        </Link>
        <Button className="mr-40" variant={"ghost"}>
          Home
        </Button>
        <Button className="mr-40" variant={"ghost"}>
          Chat
        </Button>
        {user ? (
          <SignOutButton>
            <img
              src={user?.imageUrl}
              className="rounded-full w-[40px] cursor-pointer"
            ></img>
          </SignOutButton>
        ) : (
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export function SheetSide() {
  return (
    <div className="lg:hidden grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col">
            <Link href={"../"}>
              <Button className="my-4 w-full">Home</Button>
            </Link>
            <Button className="my-4">Home</Button>
            <Button className="my-4">Chat</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
