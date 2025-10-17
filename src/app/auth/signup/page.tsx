"use client";

import { signUpAction } from "@/_server/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";

export default function SignupPage() {
  const [state, dispatch] = useFormState(signUpAction, undefined);

  return (
    <div className="bg-background flex h-dvh items-center justify-center">
      {/* Card */}
      <div className="sm:bg-card sm:border-border rounded-card text-card-foreground flex h-full w-dvh flex-col gap-8 px-6 py-4 sm:w-[400px] sm:min-w-[400px] sm:border">
        bok
      </div>
    </div>
  );
}
