"use client";

import {
  Button,
  Input,
  LogoIcon,
  RedirectLink,
  toast,
} from "@/_client/6_shared";
import { SocialButton } from "@/_client/4_features";
import { useState } from "react";
import { signInAction } from "@/_server/actions/auth";
import { signinSchema } from "@/_server/types";
import z from "zod";
import { useRouter } from "next/navigation";

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
  const router = useRouter();

  const [form, setForm] = useState<SigninFormData>({
    email: "tin.bukovina1@gmail.com",
    password: "Test123!$%",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await signInAction(form);
      console.log("res: ", res);

      if (res.status === "success") {
        router.push("/app");
      } else {
        toast.error(res.message || "An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.log(error);
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
            <h5 className="text-h5/tight font-semibold">Sign in</h5>
            <p className="text-muted-foreground text-normal/tight">
              Hi! Welcome back, you&apos;ve been missing.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="relative flex flex-col gap-4">
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
            <div className="flex flex-col gap-2">
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
              {/* Forgot password */}
              <RedirectLink href="/auth/forgot-password" disabled={isLoading}>
                Forgot your password?
              </RedirectLink>
            </div>

            {/* Signin button */}
            <Button type="primary" action="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
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
          <SocialButton loginType="email" disabled={true /* isLoading */} />
          <SocialButton loginType="google" disabled={true /* isLoading */} />
          <SocialButton loginType="apple" disabled={true /* isLoading */} />
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
