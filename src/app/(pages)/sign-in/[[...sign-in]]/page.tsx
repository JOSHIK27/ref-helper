import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="flex justify-center mt-16">
      <SignIn path="/sign-in" />
    </div>
  );
}
