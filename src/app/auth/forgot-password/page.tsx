"use client";

import { SocialButton } from "@/_client/4_features";
import {
  Button,
  Input,
  LogoIcon,
  RedirectLink,
  toast,
} from "@/_client/6_shared";
import { requestPasswordReset } from "@/_server/actions/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormDataInterface {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormDataInterface>({
    email: "tin.bukovina1@gmail.com",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("bok");
    setIsLoading(true);

    try {
      console.log("Prije");
      const res = await requestPasswordReset(form);

      console.log(res);
      if (res.status === "success") {
        toast.success(res.message || "Password reset link sent.");
        router.push("/auth/signin");
      } else {
        toast.error(res.message || "something went wrong.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
            <h5 className="text-h5/tight font-semibold">Forgot password?</h5>
            <p className="text-muted-foreground text-normal/tight">
              We will sent recovery link to your email.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="relative flex flex-col gap-6">
            {/* Inputs */}
            <Input
              value={form.email}
              onChange={handleChange}
              name="email"
              label="Email"
              inputType="email"
              required={true}
              placeholder="Enter your email"
              disabled={isLoading}
            />

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <Button type="primary" action="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Send link"}
              </Button>
              <Button
                type="secondary"
                handleClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Back"}
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
