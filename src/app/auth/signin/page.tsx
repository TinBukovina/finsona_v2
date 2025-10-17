"use client";

import { Button, Input, LogoIcon } from "@/_client/6_shared";
import Link from "next/link";
import { SocialButton } from "@/_client/4_features";
import { useState } from "react";
import { signInAction } from "@/_server/actions/auth";
import { signinSchema } from "@/_server/types";
import z from "zod";
import { useRouter } from "next/navigation";

type SigninFormData = z.infer<typeof signinSchema>;
type FormErrorState = {
  message?: string | null;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export default function SigninPage() {
  const router = useRouter();

  const [form, setForm] = useState<SigninFormData>({
    email: "test@gmail.com",
    password: "test1234",
  });
  const [formErrors, setFormErrors] = useState<FormErrorState>({});
  const [isFormSubmited, setIsFormSubmited] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmited(true);

    try {
      const res = await signInAction(form);
      console.log("res: ", res);

      if (res.status === "success") {
        router.push("/app");
      } else {
        setFormErrors({
          message:
            res.message !== "Please fix the errors below."
              ? res.message
              : "Fix errors above.",
          errors: res.errors,
        });
      }
    } catch (error) {
      setFormErrors({ message: "An unexpected error occurred." });
      console.log(error);
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      {/* Card */}
      <div className="bg-card border-border rounded-card text-card-foreground flex min-w-[400px] flex-col gap-8 border px-6 py-4">
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
              label="Email"
              inputType="email"
              required={true}
              placeholder="Enter your email"
              isValid={
                formErrors.errors?.email ? false : isFormSubmited ? true : null
              }
              errorMsg={formErrors.errors?.email?.[0]}
            />
            <div className="flex flex-col gap-2">
              <Input
                value={form.password}
                onChange={handleChange}
                label="Password"
                inputType="password"
                required={true}
                placeholder="Enter your password"
                isValid={
                  formErrors.errors?.password
                    ? false
                    : isFormSubmited
                      ? true
                      : null
                }
                errorMsg={formErrors.errors?.password?.[0]}
              />
              <Link
                href="/auth/forgot-password"
                className="text-normal/tight text-primary w-fit font-semibold hover:cursor-pointer hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Button type="primary" action="submit">
              Sign in
            </Button>
            {formErrors.message && (
              <p className="text-normal/[16px] text-destructive w-full text-center">
                {formErrors.message}
              </p>
            )}
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
          <SocialButton loginType="email" />
          <SocialButton loginType="google" />
          <SocialButton loginType="apple" />
        </div>

        {/* Don't have an account */}
        <p className="text-center text-sm/[16px]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-semibold hover:cursor-pointer hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
