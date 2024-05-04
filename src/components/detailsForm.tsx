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
import { countries, roles, fields, ed } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleSubmission } from "@/actions";
const formSchema = z.object({
  username: z.string().max(10),
  education: z.string(),
  visaExpiry: z.string(),
  country: z.string(),
  field: z.string(),
  // Resume: z.instanceof(FileList).optional(),
  experience: z.string(),
});

export default function Details() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  // const fileRef = form.register("Resume");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await handleSubmission(values);
  }

  return (
    <div className="w-[500px] bg-white shadow-md rounded-md mx-auto mt-12">
      <div className="text-center font-semibold text-lg pt-4">Details</div>
      <div className="flex justify-center px-8 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className="w-[430px]"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[430px]">
                            <SelectValue placeholder="Education" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          onCloseAutoFocus={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <SelectGroup>
                            {ed.map((item) => {
                              return (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="visaExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Expiry</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[430px]"
                      type="date"
                      placeholder="Visa Expiry"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[430px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <SelectGroup>
                        {countries.map((item) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[430px]">
                        <SelectValue placeholder="Field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <SelectGroup>
                        {fields.map((item) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="Resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cv</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef}></Input>
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[430px]">
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <SelectGroup>
                        {roles.map((item) => {
                          return (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" className="mr-4">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
