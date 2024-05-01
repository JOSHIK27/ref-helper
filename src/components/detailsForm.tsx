"use client";
import * as React from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { handleSubmission } from "@/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  const [formData, setFormData] = React.useState(null);

  return (
    <div className="w-[500px] bg-white shadow-md rounded-md mx-auto mt-12">
      <div className="text-center font-semibold text-lg pt-4">Details</div>
      <div className="flex justify-center px-8">
        <ProfileForm formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

interface propsTypes {
  arr: string[];
  formData: {
    name?: string;
    field?: string;
    Education?: string;
    Country?: string;
    Roles?: string;
  };
  setFormData: ({}) => void;
  field: string;
}

export function SelectDemo(props: propsTypes) {
  const { arr, formData, setFormData, field } = props;
  const temp = arr.map((item: string) => (
    <SelectItem key={item} value={item}>
      {item}
    </SelectItem>
  ));
  return (
    <Select
      onValueChange={(e) => {
        setFormData({ ...formData, [field]: e });
      }}
    >
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

interface ProfileProps {
  name?: string;
  field?: string;
  Education?: string;
  Country?: string;
  Roles?: string;
  setFormData: () => void;
}

export function ProfileForm({ formData, setFormData }) {
  const form = useForm();

  const handleInput = (e: string, field: string) => {
    setFormData({
      ...formData,
      [field]: e,
    });
  };

  return (
    <Form {...form}>
      <form action={() => handleSubmission(formData)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="w-[430px]"
                  placeholder="Name"
                  {...field}
                  onChange={(e) => {
                    handleInput(e.target.value, "name");
                  }}
                />
              </FormControl>
              <FormLabel>Education</FormLabel>
              <FormControl>
                <SelectDemo
                  formData={formData}
                  setFormData={setFormData}
                  field={"Education"}
                  arr={ed}
                />
              </FormControl>
              <FormLabel>Visa Expiry</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  className="w-[430px]"
                  placeholder="Name"
                  {...field}
                  onChange={(e) => {
                    handleInput(e.target.value, "visaExpiry");
                  }}
                ></Input>
              </FormControl>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <SelectDemo
                  formData={formData}
                  setFormData={setFormData}
                  field={"Country"}
                  arr={countries}
                />
              </FormControl>
              <FormLabel>Field</FormLabel>
              <FormControl>
                <SelectDemo
                  formData={formData}
                  setFormData={setFormData}
                  field={"Field"}
                  arr={fields}
                />
              </FormControl>
              <FormLabel>Roles</FormLabel>
              <FormControl>
                <SelectDemo
                  formData={formData}
                  setFormData={setFormData}
                  field={"Role"}
                  arr={roles}
                />
              </FormControl>
              <FormLabel>Cv</FormLabel>
              <FormControl>
                <Input type="file"></Input>
              </FormControl>
              <div className="pb-4 pt-4">
                <Button className="mr-4" type="submit">
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    window.location.reload();
                  }}
                  variant={"secondary"}
                >
                  Clear
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
