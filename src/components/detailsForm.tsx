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
import { Buffer } from "buffer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().max(10),
  education: z.string(),
  visaExpiry: z.string(),
  country: z.string(),
  field: z.string(),
  resume: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
  experience: z.string(),
});

export default function Details({
  username,
  exisitingDetails,
  mode,
}: {
  username?: string;
  exisitingDetails?: {
    username: string;
    education: string;
    visaExpiry: string;
    country: string;
    field: string;
    experience: string;
    file: any;
  };
  mode: string;
}) {
  const [isDisabled, setIsDisabled] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode == "Submit Details" ? { username: username } : exisitingDetails,
  });
  const fileRef = form.register("resume");
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const f = values.resume;
    const bytes = await f[0].arrayBuffer();
    const buffer = Buffer.from(bytes);
    if (typeof document != undefined) setIsDisabled(true);
    if (mode == "Submit Details") {
      fetch("api/detailsForm", {
        body: JSON.stringify({ ...values, file: buffer }),
        method: "POST",
      })
        .then((resp) => {
          return resp.json();
        })
        .then(({ success }) => {
          setIsDisabled(false);
          window.location.reload();
        });
    } else {
      fetch("api/detailsForm", {
        body: JSON.stringify({ ...values, file: buffer }),
        method: "PUT",
      })
        .then((resp) => {
          return resp.json();
        })
        .then(({ success }) => {
          setIsDisabled(false);
          window.location.reload();
        });
    }
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
                        value={
                          mode == "Submit Details"
                            ? username
                            : exisitingDetails?.username
                        }
                        disabled={true}
                        // {...field}
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
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cv</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef}></Input>
                  </FormControl>
                </FormItem>
              )}
            />
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
            <Button disabled={isDisabled} type="submit" className="w-full">
              {mode}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
