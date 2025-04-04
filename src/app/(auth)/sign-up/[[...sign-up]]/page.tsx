"use client";

import { SignUp } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignUp signInUrl="/sign-in" signInForceRedirectUrl="/home" />
    </div>
  );
}
