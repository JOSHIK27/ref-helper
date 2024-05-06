"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { supabase } from "@/lib/supabase";

interface message {
  conversation_id: number;
  created_at: string;
  from: string;
  id: number;
  message: string;
  to: string;
}

export default function ChatCard({
  convoId,
  user,
  params,
  imageUrl,
  messages,
}: {
  convoId: number;
  user: any;
  params: any;
  imageUrl: string;
  messages: message[] | null;
}) {
  const [message, setMessage] = React.useState("");

  const handleMessageInput = async (message: string) => {
    await supabase.from("messages").insert({
      conversation_id: convoId,
      message: message,
      from: user.user?.firstName,
      to: params.id,
    });
    setMessage("");
  };

  return (
    <Card className=" md:w-[600px] mx-auto mt-12">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{params.id}</div>
          <Button>Back</Button>
        </CardTitle>
        <div className="bg-black h-[0.25px]"></div>
      </CardHeader>
      <CardContent className="h-80 overflow-y-scroll">
        {messages?.map((item, index) => (
          <div
            key={index}
            className={`flex ${
              user.user.firstName != item.from ? "flex-row" : "flex-row-reverse"
            } items-center mb-4`}
          >
            <img
              src={
                user.user.firstName != item.from ? imageUrl : user.user.imageUrl
              }
              className={`rounded-full w-[25px] cursor-pointer ${
                user.user.firstName != item.from ? "ml-4" : "mr-4"
              }`}
            ></img>
            <div className="bg-[#eae2cb] p-4 rounded-lg">{item.message}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-end">
        <div className="grid w-full gap-2">
          <Textarea
            id="message"
            value={message}
            placeholder="Type your message here."
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={() => handleMessageInput(message)}>
            Send message
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
