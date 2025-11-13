"use client";

import { signUpAction } from "@/_server/actions/auth";
import {
  Button,
  Input,
  LogoIcon,
  paths,
  RedirectLink,
  toast,
} from "@/_client/6_shared";
import { useState } from "react";

interface SignupFormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
type FormErrorState = {
  message?: string | null;
  errors?: {
    name?: string[];
    surname?: string[];
    email?: string[];
    password?: string[];
  };
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupFormData>({
    name: "Tin",
    surname: "B",
    email: "tin@gmail.com",
    password: "Test123!$%",
    confirmPassword: "Test123!$",
  });
  const [formErrors, setFormErrors] = useState<FormErrorState>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormSubmited, setIsFormSubmited] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({});
    setIsLoading(true);
    setIsFormSubmited(true);

    if (form.password !== form.confirmPassword) {
      setIsLoading(false);
      setIsFormSubmited(false);
      setFormErrors({
        message: "Please fix all errors.",
        errors: {
          password: ["Passwords do not match."],
        },
      });
      return;
    }

    try {
      const res = await signUpAction({
        name: form.name,
        surname: form.surname,
        email: form.email,
        password: form.password,
      });
      console.log("res: ", res);

      if (res.status === "success") {
      } else {
        toast.error(res.message || "An unexpected error occurred.");
        setFormErrors({
          message: res.message,
          errors: res.errors,
        });
      }
    } catch (error) {
      setFormErrors({ message: "An unexpected error occurred." });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background flex h-dvh items-center justify-center">
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
            <h5 className="text-h5/tight font-semibold">Sign up</h5>
            <p className="text-muted-foreground text-normal/tight">
              Fill your information bellow to register.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="relative flex flex-col gap-6">
            {/* Inputs */}
            <div className="flex flex-col gap-2">
              <div className="flex w-full gap-2">
                <Input
                  value={form.name}
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  required={true}
                  placeholder="John"
                  isValid={
                    formErrors.errors?.name
                      ? false
                      : isFormSubmited
                        ? true
                        : null
                  }
                  errorMsg={formErrors.errors?.name?.[0]}
                  disabled={isLoading}
                />
                <Input
                  value={form.surname}
                  onChange={handleChange}
                  name="surname"
                  label="Surname"
                  required={true}
                  placeholder="Cambel"
                  isValid={
                    formErrors.errors?.surname
                      ? false
                      : isFormSubmited
                        ? true
                        : null
                  }
                  errorMsg={""}
                  disabled={isLoading}
                />
              </div>
              <Input
                value={form.email}
                onChange={handleChange}
                name="email"
                label="Email"
                inputType="email"
                required={true}
                placeholder="Enter your email"
                isValid={
                  !!formErrors.errors?.email
                    ? false
                    : isFormSubmited
                      ? true
                      : null
                }
                errorMsg={formErrors.errors?.email?.[0]}
                disabled={isLoading}
              />
              <Input
                value={form.password}
                onChange={handleChange}
                name="password"
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
                isValid={
                  formErrors.errors?.password
                    ? false
                    : isFormSubmited
                      ? true
                      : null
                }
              />
            </div>

            {/* Signin button */}
            <Button type="primary" action="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </form>
        </div>

        {/* Don't have an account */}
        <p className="text-center text-sm/[16px]">
          Don&apos;t have an account?{" "}
          <RedirectLink href={paths.app.auth.signIn} disabled={isLoading}>
            Sign in
          </RedirectLink>
        </p>
      </div>
    </div>
  );
}
