import { currentUser } from "@clerk/nextjs/server";
import { Input } from "./ui/input";
import SheetSide from "./ui/postSheet";
export default async function Post() {
  const user = await currentUser();
  return (
    <div className="bg-white w-[400px] lg:w-[550px] rounded-lg mx-auto mt-4">
      <div className="flex justify-evenly pb-4">
        <img src={user?.imageUrl} className="rounded-full w-[48px] mt-4"></img>
        <SheetSide />
      </div>
    </div>
  );
}
