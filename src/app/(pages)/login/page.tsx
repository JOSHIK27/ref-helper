import { Button } from "@/components/ui/button";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Login() {
  const user = await currentUser();
  return (
    <div className="w-[400px] h-[400px] border shadow-xl mx-auto mt-20">
      <SignInButton>
        <Button>Login</Button>
      </SignInButton>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
}
