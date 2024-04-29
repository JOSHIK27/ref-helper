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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
const ed = ["Education Level", "Bachelors", "Masters"];

export default function Details() {
  const router = useRouter();
  return (
    <div className="w-[500px] bg-white shadow-md rounded-md mx-auto mt-12">
      <div className="text-center font-semibold text-lg pt-4">Details</div>
      <div className="flex justify-center px-8">
        <ProfileForm />
      </div>
      <div className="flex justify-center my-8">
        <Button
          onClick={() => {
            router.push("../sign-in");
          }}
          className="w-[430px] mb-4"
        >
          Submit
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
      <SelectTrigger className="w-[430px]">
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

export function ProfileForm() {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-[430px]" placeholder="Name" {...field} />
              </FormControl>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <SelectDemo arr={ed} />
              </FormControl>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <SelectDemo arr={countries} />
              </FormControl>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                <SelectDemo arr={roles} />
              </FormControl>
              <FormLabel>Cv</FormLabel>
              <FormControl>
                <Input type="file"></Input>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
