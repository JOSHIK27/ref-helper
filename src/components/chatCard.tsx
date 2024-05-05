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

export default function ChatCard({ imageUrl }: { imageUrl: string }) {
  return (
    <Card className="w-[300px] md:w-[600px] mx-auto mt-12">
      <CardHeader>
        <CardTitle>
          <img
            src={imageUrl}
            className="rounded-full w-[40px] cursor-pointer"
          ></img>
        </CardTitle>
        <div className="bg-black h-[0.25px]"></div>
      </CardHeader>
      <CardContent className="h-60 overflow-y-scroll">
        <h1>Joshik</h1>
        <h1>Joshik</h1>
        <h1>Joshik</h1>
        <h1>Joshik</h1>
        <h1>Joshik</h1>
        <h1>Joshik</h1>
      </CardContent>
      <CardFooter className="flex items-end">
        <Textarea />
        <Button>Send</Button>
      </CardFooter>
    </Card>
  );
}
