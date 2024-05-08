"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import ChatCard from "@/components/chatCard";

interface message {
  conversation_id: number;
  created_at: string;
  from: string;
  id: number;
  message: string;
  to: string;
}

export default function Chat({ params }: { params: { id: string } }) {
  const [convoId, setConvoId] = useState<number>(0);
  const [messagesList, setMessagesList] = useState<message[] | null>([]);
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
          const resp = await supabase
            .from("messages")
            .select()
            .eq("conversation_id", data[0].id);
          const prevMessages = resp.data;
          setMessagesList(prevMessages);
        } else {
          const { data, error } = await supabase
            .from("conversations")
            .select()
            .eq("person2", user.user?.firstName)
            .eq("person1", params.id);
          console.log(data);
          if (data && data[0]) {
            setConvoId(data[0].id);
            const resp = await supabase
              .from("messages")
              .select()
              .eq("conversation_id", data[0].id);
            const prevMessages = resp.data;
            setMessagesList(prevMessages);
          }
        }
      }
    };
    allMagic().catch((err) => {
      alert(err);
    });

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log(payload);
          if (payload.new.conversation_id == convoId) {
            setMessagesList((cur) => {
              if (cur) {
                return [...cur, payload.new as message];
              } else {
                return [payload.new as message];
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.isLoaded, params.id, supabase, convoId]);

  if (user.isLoaded == false) return <>Loading....</>;

  return (
    <ChatCard
      convoId={convoId}
      user={user}
      params={params}
      imageUrl={temp.get("imageUrl") ?? ""}
      messages={messagesList}
    />
  );
}
