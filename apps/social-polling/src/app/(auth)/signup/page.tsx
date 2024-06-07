import { Link } from "@nextui-org/react";

import { SignupForm } from "./_components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
        <div className="w-full text-left">
          <p className="pb-2 text-xl font-medium">Create Account</p>
          <p className="text-small text-default-500">
            Sign up for a new account to get started
          </p>
        </div>

        <SignupForm />

        <p className="text-small text-center">
          Already have an account?&nbsp;
          <Link href="/login" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
