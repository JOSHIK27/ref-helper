import * as React from "react";
import { daysFromToday } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  role: string;
  imageUrl: string;
  proof: string;
  visaExpiry: string;
}

export function PostCard({ role, imageUrl, proof, visaExpiry }: PostCardProps) {
  return (
    <Card className="bg-white w-[400px] lg:w-[550px] rounded-lg mx-auto mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={imageUrl}
              className="rounded-full w-[40px] mt-4 mr-4"
            ></img>
            <CardTitle className="pt-4">{role}</CardTitle>
          </div>
          <Badge variant="destructive">
            Visa Expires In: {daysFromToday(visaExpiry)} Days
          </Badge>
        </div>
        <CardDescription className="pt-4">{proof}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <Button variant="outline" className="w-11/12 ml-4 mb-4">
        Download CV
      </Button>
      <Button className="w-11/12 ml-4 mb-4">Refer Me !</Button>
    </Card>
  );
}
