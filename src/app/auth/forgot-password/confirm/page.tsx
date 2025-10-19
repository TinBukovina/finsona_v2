"use client";

import { SocialButton } from "@/_client/4_features";
import { Button, Input, LogoIcon, RedirectLink } from "@/_client/6_shared";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormDataInterface {
  password: string;
  confirmPassword: string;
}

export default function ConfirmPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormDataInterface>({
    password: "Test123!$%",
    confirmPassword: "Test123!$%",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = () => {};
  const onSubmit = () => {};

  return (
    <div className="flex h-dvh items-center justify-center">
      {/* Card */}
      <div className="sm:bg-card sm:border-border rounded-card text-card-foreground flex h-full w-dvh flex-col justify-center gap-8 px-6 py-4 sm:h-fit sm:w-[400px] sm:min-w-[400px] sm:border">
        {/* Logo and slogan */}
        <div className="flex flex-col gap-0">
          {/* Logo */}
          <div className="flex w-fit items-center gap-4">
            <LogoIcon className="h-[40px] w-[40px]" isDarkMode={true} />
            <h2 className="text-h2/tight font-bold">Finsona</h2>
          </div>
          {/* Slogan */}
          <p className="text-normal/tight">Finance, finally simple.</p>
        </div>

        {/* Signin section */}
        <div className="flex flex-col gap-6">
          {/* Title and welcome text */}
          <div className="flex flex-col gap-2">
            <h5 className="text-h5/tight font-semibold">Password reset</h5>
            <p className="text-muted-foreground text-normal/tight">
              Enter your new password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="relative flex flex-col gap-4">
            {/* Inputs */}
            <Input
              value={form.password}
              onChange={handleChange}
              name="password"
              label="Password"
              inputType="password"
              required={true}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <Input
              value={form.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              inputType="password"
              required={true}
              placeholder="Repeat password"
              disabled={isLoading}
            />

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                type="primary"
                handleClick={(e) => {
                  e.preventDefault();
                  router.push("/auth/signin");
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Reset password"}
              </Button>
            </div>
          </form>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-2">
          <div className="bg-border h-[1px] w-full" />
          <p className="text-muted-foreground block text-sm/[16px] whitespace-nowrap">
            Or continue with
          </p>
          <div className="bg-border h-[1px] w-full" />
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-2">
          <SocialButton loginType="email" disabled={isLoading} />
          <SocialButton loginType="google" disabled={isLoading} />
          <SocialButton loginType="apple" disabled={isLoading} />
        </div>

        {/* Don't have an account */}
        <p className="text-center text-sm/[16px]">
          Don&apos;t have an account?{" "}
          <RedirectLink href="/auth/signup" disabled={isLoading}>
            Sign up
          </RedirectLink>
        </p>
      </div>
    </div>
  );
}
