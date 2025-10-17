"use server";

import { signIn, signOut } from "@/../auth";
import { db } from "@/_db/drizzle";
import { users } from "@/_db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import z from "zod";
import { signinSchema, signupSchema } from "../types";

type SigninFormData = z.infer<typeof signinSchema>;
type ActionState = {
  status: "success" | "error";
  message?: string | null;
  fieldValue?: SigninFormData;
  errors?: { [K in keyof SigninFormData]?: string[] };
};

export async function signInAction(
  formData: SigninFormData,
): Promise<ActionState> {
  const validatedFields = signinSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fix the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValue: {
        email: "test",
        password: "test",
      },
    };
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false,
    });
    return { status: "success", message: "Sign in successful!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", message: "Invalid email or password." };
        default:
          return {
            status: "error",
            message: "Something went wrong. Please try again.",
          };
      }
    }

    throw error;
  }
}

type SignupFormData = z.infer<typeof signupSchema>;

export async function signUpAction(
  formData: SignupFormData,
): Promise<ActionState> {
  const validatedFields = signupSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Please fix all errors.",
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValue: {
        email: "test",
        password: "test",
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { status: "error", message: "Email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
    });
  } catch (error) {
    console.error("Registration DB error:", error);
    return { status: "error", message: "Something went wrong." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/app" });

    return { status: "success", message: "Sign up successfully!" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("Login DB error: ", error);
      return { status: "error", message: "Something went wrong." };
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/auth/signin" });
}
