"use client"

import { SignUp } from "@clerk/clerk-react"

export default function SignUpPage() {
  return <SignUp path="/sign-up" forceRedirectUrl={'/dashboard'} />;
}