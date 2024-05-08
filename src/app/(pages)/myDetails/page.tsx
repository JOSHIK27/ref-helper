import { client } from "@/lib/mongodb";
import Details from "@/components/detailsForm";
import { currentUser } from "@clerk/nextjs/server";
export default async function Page() {
  const user = await currentUser();
  const details = await CheckForDetails(user?.primaryEmailAddressId);
  if (details) {
    return (
      <Details
        exisitingDetails={{
          username: details.username,
          education: details.education,
          visaExpiry: details.visaExpiry,
          country: details.country,
          field: details.field,
          experience: details.experience,
          file: details.file,
        }}
        mode="Update Details"
      />
    );
  }

  return <></>;
}

type params = string | null | undefined;
async function CheckForDetails(id: params) {
  await client.connect();
  const database = client.db("referral");
  const collection = await database
    .collection("users")
    .find({ emailId: id })
    .toArray();
  await client.close();
  if (collection.length) return collection[0];
  return false;
}
