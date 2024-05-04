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
  const { acknowledged } = await database.collection("users").insertOne({
    ...formData,
    emailId: user?.primaryEmailAddressId,
    imageUrl: user?.imageUrl,
  });
  await client.close();
  if (acknowledged) {
    redirect("./");
  }
}

interface newPostProps {
  role: string;
  proof: string;
}

export async function createPost(formData: newPostProps) {
  await client.connect();
  const user = await currentUser();
  const database = client.db("referral");
  const resp = await database
    .collection("users")
    .findOne({ emailId: user?.primaryEmailAddressId });

  const { acknowledged } = await database.collection("posts").insertOne({
    ...formData,
    userId: user?.id,
    emailId: user?.primaryEmailAddressId,
    imageUrl: user?.imageUrl,
    visaExpiry: resp?.visaExpiry,
    name: resp?.username,
    education: resp?.education,
    experience: resp?.experience,
    country: resp?.country,
  });
  await client.close();
  if (acknowledged) {
    redirect("./");
  }
}
