"use server";
import { redirect } from "next/navigation";
import { client } from "./lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
interface ProfileProps {
  name?: string;
  field?: string;
  Education?: string;
  Country?: string;
  Roles?: string;
}

export async function handleSubmission(formData: ProfileProps) {
  await client.connect();
  const user = await currentUser();
  const database = client.db("referral");
  const { acknowledged } = await database
    .collection("users")
    .insertOne({ ...formData, emailId: user?.primaryEmailAddressId });
  await client.close();
  if (acknowledged) {
    redirect("./");
  }
}
