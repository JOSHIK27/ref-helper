"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import ChatCard from "@/components/chatCard";
import { Skeleton } from "@/components/ui/skeleton";
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
  const router = useRouter();
  const temp = useSearchParams();

  useEffect(() => {
    if (!user.isLoaded) return;

    let channel: ReturnType<typeof supabase.channel> | null = null;
    let temp_convoId: number | null = null;

    const allMagic = async () => {
      try {
        const { data, error } = await supabase.from("conversations").select();
        if (error) throw error;

        let rowFound = false;
        data?.forEach((row) => {
          if (
            (row.person1 == params.id && row.person2 == user.user?.firstName) ||
            (row.person2 == params.id && row.person1 == user.user?.firstName)
          ) {
            rowFound = true;
          }
        });

        if (!rowFound) {
          console.log(
            "Creating new conversation",
            params.id,
            user.user?.firstName
          );
          await supabase.from("conversations").insert({
            person1: user.user?.firstName,
            person2: params.id,
            p1ImageUrl: user.user?.imageUrl,
            p2ImageUrl: temp.get("imageUrl"),
          });
          const { data } = await supabase
            .from("conversations")
            .select()
            .eq("person1", user.user?.firstName)
            .eq("person2", params.id);
          if (data) {
            temp_convoId = data[0].id;
            setConvoId(data[0].id);
          }
        } else {
          const { data } = await supabase
            .from("conversations")
            .select()
            .eq("person1", user.user?.firstName)
            .eq("person2", params.id);
          if (data && data[0]) {
            temp_convoId = data[0].id;
            setConvoId(data[0].id);
            const resp = await supabase
              .from("messages")
              .select()
              .eq("conversation_id", data[0].id);
            const prevMessages = resp.data;
            setMessagesList(prevMessages);
          } else {
            const { data } = await supabase
              .from("conversations")
              .select()
              .eq("person2", user.user?.firstName)
              .eq("person1", params.id);
            if (data && data[0]) {
              temp_convoId = data[0].id;
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

        if (temp_convoId) {
          console.log("Creating channel", temp_convoId);
          channel = supabase
            .channel("messages")
            .on(
              "postgres_changes",
              {
                event: "INSERT",
                schema: "public",
                table: "messages",
              },
              (payload) => {
                console.log("New message received", payload.new, temp_convoId);
                if (payload.new.conversation_id === String(temp_convoId)) {
                  console.log("New message received", payload.new);
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
        }
      } catch (err) {
        console.error("Error in chat setup:", err);
      }
    };

    allMagic();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user.isLoaded, params.id]);

  if (user.isSignedIn == false) {
    router.push("/sign-in");
  }
  if (user.isLoaded == false) return <Skeleton />;

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
