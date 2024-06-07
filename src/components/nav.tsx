import { currentUser } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { HomeIcon, ChatBubbleIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { SignOutButton, SignInButton } from "@clerk/nextjs";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default async function Nav() {
  const user = await currentUser();
  return (
    <div className="bg-white fixed z-50 top-0 w-full shadow-md h-12 flex lg:justify-evenly items-center">
      <SheetSide user={user} />
      <div className="hidden lg:flex">
        <Link href={"../"}>
          <Button className="mr-40" variant={"outline"}>
            Home
          </Button>
        </Link>
        <Link href={"../feed"}>
          <Button className="mr-40" variant={"outline"}>
            Feed
          </Button>
        </Link>
        <Link href={"../chats"}>
          <Button className="mr-40" variant={"outline"}>
            Chats
          </Button>
        </Link>
        {user ? (
          <Popover>
            <PopoverTrigger className="cursor-pointer" asChild>
              <img
                src={user?.imageUrl}
                className="rounded-full w-[40px] cursor-pointer"
              ></img>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <Link href={"/myPosts"}>
                <Button className="w-full h-8 mb-[4px]">My Posts</Button>
              </Link>
              <Link href={"/myDetails"}>
                <Button className="w-full h-8 mb-[4px]">My Details</Button>
              </Link>

              <SignOutButton>
                <Button className="w-full h-8">SignOut</Button>
              </SignOutButton>
            </PopoverContent>
          </Popover>
        ) : (
          <SignInButton>
            <Button>Login</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
}

export function SheetSide({ user }: { user: any }) {
  return (
    <div className="lg:hidden grid grid-cols-2 gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="ml-2">
            Menu
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className="">
          <div className="flex flex-col">
            <Link href={"../"}>
              <Button className="w-full my-4">
                Home
                <HomeIcon className="ml-4" />
              </Button>
            </Link>
            <Link href={"../feed"}>
              <Button className="my-4 w-full">
                Feed
                <Pencil1Icon className="ml-4" />
              </Button>
            </Link>
            <Link href={"../chats"}>
              <Button className="my-4 w-full">
                Chat <ChatBubbleIcon className="ml-4" />
              </Button>
            </Link>
            {user ? (
              <Popover>
                <PopoverTrigger className="cursor-pointer mx-auto" asChild>
                  <img
                    src={user?.imageUrl}
                    className="rounded-full w-[40px] cursor-pointer"
                  ></img>
                </PopoverTrigger>
                <PopoverContent className="w-60">
                  <Link href={"/myPosts"}>
                    <Button className="w-full h-8 mb-[4px]">My Posts</Button>
                  </Link>
                  <Link href={"/myDetails"}>
                    <Button className="w-full h-8 mb-[4px]">My Details</Button>
                  </Link>

                  <SignOutButton>
                    <Button className="w-full h-8">SignOut</Button>
                  </SignOutButton>
                </PopoverContent>
              </Popover>
            ) : (
              <SignInButton>
                <Button>Login</Button>
              </SignInButton>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
