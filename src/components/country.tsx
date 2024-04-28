"use client";
import * as React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const countries = [
  "Select the country",
  "United Kingdom",
  "United States Of America",
  "Canada",
  "Germany",
  "Australia",
];
const roles = [
  "Select your role",
  "Fresher",
  "More than 1yr",
  "More than 2yrs",
  "More than 3yrs",
  "More than 4yrs",
];
const fields = [
  "Select the field",
  "Software Development",
  "Data Science",
  "AI",
  "Finance",
  "Civil",
];

export default function Country() {
  const router = useRouter();
  return (
    <div className="w-[350px] bg-white shadow-md rounded-md mx-auto mt-16">
      <br />
      <div className="flex justify-center">
        <SelectDemo arr={countries} />
      </div>
      <br />
      <div className="flex justify-center">
        <SelectDemo arr={roles} />
      </div>
      <br />
      <div className="flex justify-center">
        <SelectDemo arr={fields} />
      </div>
      <br />
      <div className="flex justify-center pb-8">
        <Button
          onClick={() => {
            router.push("../sign-in");
          }}
          className="w-[300px]"
          variant={"secondary"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

interface propsTypes {
  arr: string[];
}

export function SelectDemo(props: propsTypes) {
  const { arr } = props;
  const temp = arr.map((item: string) => (
    <SelectItem value={item}>{item}</SelectItem>
  ));
  return (
    <Select>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder={arr[0]} />
      </SelectTrigger>
      <SelectContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <SelectGroup>
          {temp.filter((item, index: number) => {
            return index > 0;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
