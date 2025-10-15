"use client";

import { signInAction } from "@/_server/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import { Button, Input, LogoIcon } from "@/_client/6_shared";
import { useState } from "react";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
    >
      {pending ? "Signing In..." : "Sign In"}
    </button>
  );
}

export default function SigninPage() {
  const [emailInput, setEmailInput] = useState<string>("");

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      {/* Card */}
      <div className="bg-card border-border rounded-card text-card-foreground flex min-w-[466px] flex-col gap-12 border px-8 py-6">
        {/* Logo and slogan */}
        <div>
          {/* Logo */}
          <div className="flex w-fit items-center gap-2">
            <LogoIcon isDarkMode={true} />
            <h2 className="text-h2/tight font-bold">Finsona</h2>
          </div>
          {/* Slogan */}
          <p className="text-normal/tight">Finance, finally simple.</p>
        </div>

        {/* Signin section */}
        <div className="flex flex-col gap-6">
          {/* Title and welcome text */}
          <div className="flex flex-col gap-2">
            <h5 className="text-h5/tight font-semibold">Sign in</h5>
            <p className="text-muted-foreground text-normal/tight">
              Hi! Welcome back, you&apos;ve been missing.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {/* Inputs */}
            <Input
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              label="Email"
              inputType="email"
              required={true}
              placeholder="Enter your email"
              errorMsg="Invalid email."
              isValid={null}
            />
            <div className="flex flex-col gap-2">
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                label="Password"
                inputType="password"
                required={true}
                placeholder="Enter your password"
                errorMsg="Password id to weak."
                isValid={true}
              />
              <Link
                href="/auth/forgot-password"
                className="text-normal/tight text-primary w-fit font-semibold hover:cursor-pointer hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="primary">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
