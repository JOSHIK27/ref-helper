"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import ChatCard from "@/components/chatCard";
export default function Chat({ params }: { params: { id: string } }) {
  const [convoId, setConvoId] = useState<number>(0);

  const user = useUser();
  const temp = useSearchParams();

  useEffect(() => {
    if (!user.isLoaded) return;
    const allMagic = async () => {
      const { data, error } = await supabase.from("conversations").select();
      if (error) throw error;
      let rowFound = false;
      data.forEach((row) => {
        if (
          (row.person1 == params.id && row.person2 == user.user?.firstName) ||
          (row.person2 == params.id && row.person1 == user.user?.firstName)
        ) {
          rowFound = true;
        }
      });
      if (!rowFound) {
        await supabase.from("conversations").insert({
          person1: user.user?.firstName,
          person2: params.id,
          p1ImageUrl: user.user?.imageUrl,
          p2ImageUrl: temp.get("imageUrl"),
        });
        const { data, error } = await supabase
          .from("conversations")
          .select()
          .eq("person1", user.user?.firstName)
          .eq("person2", params.id);
        if (data) {
          setConvoId(data[0].id);
        }
      } else {
        const { data } = await supabase
          .from("conversations")
          .select()
          .eq("person1", user.user?.firstName)
          .eq("person2", params.id);
        if (data && data[0]) {
          setConvoId(data[0].id);
        } else {
          const { data, error } = await supabase
            .from("conversations")
            .select()
            .eq("person2", user.user?.firstName)
            .eq("person1", params.id);
          console.log(data);
          if (data && data[0]) {
            setConvoId(data[0].id);
          }
        }
      }
    };
    allMagic().catch((err) => {
      alert(err);
    });
  }, [user]);

  if (user.isLoaded == false) return <>Loading....</>;

  const handleMessageInput = async (message: string) => {
    await supabase.from("messages").insert({
      conversation_id: convoId,
      message: message,
      from: user.user?.firstName,
      to: params.id,
    });
  };

  return <ChatCard imageUrl={temp.get("imageUrl") ?? ""} />;
}
