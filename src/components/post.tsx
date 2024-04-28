import { currentUser } from "@clerk/nextjs/server";
import { Input } from "./ui/input";
export default async function Post() {
  const user = await currentUser();
  return (
    <div className="bg-white w-[550px] h-[120px] rounded-lg mx-auto mt-4">
      <div className="flex justify-evenly">
        <img src={user?.imageUrl} className="rounded-full w-[48px] mt-4"></img>
        <Input
          placeholder="Explain Why You"
          className="rounded-full h-[48px] mt-4 w-[400px]"
        ></Input>
      </div>
      <div className="flex justify-evenly mt-4">
        <span>Media</span>
        <span>Media</span>
        <span>Media</span>
      </div>
    </div>
  );
}
