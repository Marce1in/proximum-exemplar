import { SignInButton } from "@clerk/nextjs";
import { LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <SignInButton mode="redirect">
      <Button>
        <LogInIcon />
        Sign in
      </Button>
    </SignInButton>
  );
}
