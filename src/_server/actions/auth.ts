"use server";

import { signIn, signOut } from "@/../auth";
import { db } from "@/_db/drizzle";
import { users } from "@/_db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import z from "zod";
import { signinSchema } from "../types";

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
  console.log("STARTTTTT");
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
    console.log("BOK");
    const res = await signIn("credentials", {
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
    console.log(error);
    throw error;
  }
}

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signUpAction(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prevState: any | undefined,
  formData: FormData,
) {
  const rawFormData = Object.fromEntries(formData.entries());

  const validatedFields = signUpSchema.safeParse(rawFormData);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields provided.",
      issues: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    // try...catch blok sada štiti samo logiku baze podataka
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
    });
  } catch (error) {
    console.error("Registration DB error:", error);
    return { error: "Something went wrong during user creation." };
  }

  // Nakon što je korisnik uspješno kreiran, pozivamo signIn.
  // Ovaj poziv je IZVAN try...catch bloka.
  try {
    await signIn("credentials", { email, password, redirectTo: "/app" });
  } catch (error) {
    // Ovaj catch blok je tu za svaki slučaj, ako prijava ne uspije odmah nakon registracije.
    // Najvažnije je da će propustiti NEXT_REDIRECT grešku.
    if (error instanceof AuthError) {
      return { error: "Could not sign in after registration." };
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: "/auth/signin" });
}
