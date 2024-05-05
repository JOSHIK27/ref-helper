import { supabase } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Chats() {
  const user = await currentUser();

  const { data } = await supabase
    .from("conversations")
    .select()
    .eq("person1", user?.firstName);

  return (
    <Card className="w-[400px] mx-auto mt-4">
      {data?.map((item, index) => {
        return (
          <>
            <div key={index} className="flex items-center justify-between px-8">
              <div className="flex items-center">
                <img
                  src={item?.p2ImageUrl}
                  className="rounded-full w-[48px] mt-4"
                ></img>
                <h1>{item.person2}</h1>
              </div>
              <Link
                href={`../chat/${item.person2}?imageUrl=${item.p2ImageUrl}`}
              >
                <Button className="w-11/12 ml-4 mb-4">Message</Button>
              </Link>
            </div>
            <br />
            <div className="bg-black border-[0.25px]"></div>
          </>
        );
      })}
    </Card>
  );
}
