import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Chats() {
  let temp = true;
  const user = await currentUser();
  let resp = await supabase
    .from("conversations")
    .select()
    .eq("person1", user?.firstName);

  if (!resp.data?.length) {
    resp = await supabase
      .from("conversations")
      .select()
      .eq("person2", user?.firstName);
    temp = false;
  }
  console.log(resp);
  return (
    <Card className="w-[400px] lg:w-[450px] mx-auto mt-4">
      {resp?.data?.map((item, index) => {
        return (
          <>
            <div key={index} className="flex justify-between py-4 px-8">
              <div className="flex items-center">
                <img
                  src={temp ? item?.p2ImageUrl : item?.p1ImageUrl}
                  className="rounded-full w-[40px]"
                ></img>
                <div className="ml-4 font-serif font-semibold">
                  {temp ? item.person2 : item.person1}
                </div>
              </div>
              <Link
                href={`../chat/${temp ? item.person2 : item.person1}?imageUrl=${
                  temp ? item.p2ImageUrl : item.p1ImageUrl
                }`}
              >
                <Button className="w-11/12 ml-4">Message</Button>
              </Link>
            </div>

            <div className="bg-black border-[0.25px]"></div>
          </>
        );
      })}
    </Card>
  );
}
