"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Messages() {
  const [messagesList, setMessagesList] = useState<string[]>([]);
  console.log(messagesList);
  useEffect(() => {
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
          setMessagesList((cur) => {
            return [...cur, payload.new.message];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return (
    <>
      {messagesList?.map((item, index) => {
        return <h1 key={index}>{item}</h1>;
      })}
    </>
  );
}
