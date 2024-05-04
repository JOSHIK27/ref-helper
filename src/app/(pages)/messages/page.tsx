"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Messages() {
  const [messageId, setMessageId] = useState(0);
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
          console.log(payload.new.id);
          setMessageId(payload.new.id);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
  return <>{messageId}</>;
}
