import * as React from "react";
import { daysFromToday } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

interface PostCardProps {
  role: string;
  proof: string;
  imageUrl: string;
  visaExpiry: string;
  name: string;
  education: string;
  experience: string;
  country: string;
}

export function PostCard({
  role,
  imageUrl,
  proof,
  visaExpiry,
  name,
  education,
  experience,
  country,
}: PostCardProps) {
  return (
    <Card className="bg-white w-[400px] lg:w-[550px] rounded-lg mx-auto mt-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <PopoverDemo
              imageUrl={imageUrl}
              name={name}
              education={education}
              experience={experience}
              country={country}
            />
            <CardTitle className="pt-4">{role}</CardTitle>
          </div>
          <Badge variant="destructive">
            Visa Expires In: {daysFromToday(visaExpiry)} Days
          </Badge>
        </div>
      </CardHeader>

      <CardContent>{proof}</CardContent>

      <Button variant="outline" className="w-11/12 ml-4 mb-4">
        Download CV
      </Button>
      <Link href={`../chat/${name}?imageUrl=${imageUrl}`}>
        <Button className="w-11/12 ml-4 mb-4">Refer Me !</Button>
      </Link>
    </Card>
  );
}

export function PopoverDemo({
  imageUrl,
  name,
  education,
  experience,
  country,
}: {
  imageUrl: string;
  name: string;
  education: string;
  experience: string;
  country: string;
}) {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer" asChild>
        <img src={imageUrl} className="rounded-full w-[40px] mt-4 mr-4"></img>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Personal Details</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="width"
                defaultValue={name}
                readOnly
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Education Level</Label>
              <Input
                id="maxWidth"
                defaultValue={education}
                readOnly
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Experience</Label>
              <Input
                id="height"
                readOnly
                defaultValue={experience}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Country</Label>
              <Input
                id="maxHeight"
                readOnly
                defaultValue={country}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
