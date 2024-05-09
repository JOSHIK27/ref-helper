"use client";
import { useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useUser } from "@clerk/nextjs";
export default function Notifications() {
  const { toast } = useToast();
  const user = useUser();
  useEffect(() => {
    if (!user.isLoaded) return;
    const channel = supabase
      .channel("sample")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          // toast({
          //   title: `Message From ${payload.new.from}`,
          //   description: payload.new.message,
          // });
          console.log(payload.new, user);
          if (user.isLoaded && user.user?.firstName == payload.new.to) {
            toast({
              title: `Message From ${payload.new.from}`,
              description: payload.new.message,
            });
          }
        }
      )
      .subscribe();
    console.log(channel);
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user.isLoaded, supabase]);

  return <></>;
}
