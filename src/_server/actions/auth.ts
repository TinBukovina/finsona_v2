"use server";

import { Resend } from "resend";
import { signIn, signOut } from "@/../auth";
import { db } from "@/_db/drizzle";
import { passwordResetTokens, users } from "@/_db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { signinSchema, signupSchema } from "../types";
import { paths } from "@/_client/6_shared";

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
  await signOut({ redirectTo: paths.app.auth.signIn });
}

const forgotPasswordSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters long."),
  token: z.string().min(1, "Token is required."),
});

export async function requestPasswordReset(formData: {
  email: string;
}): Promise<ActionState> {
  const validateFields = forgotPasswordSchema.safeParse(formData);

  if (!validateFields.success) {
    return { status: "error", message: "Invalid email provided." };
  }

  const { email } = validateFields.data;

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Always sent succes to prevent "email enumeration" attacks
    if (!user) {
      console.log("ERROR");
      return {
        status: "success",
        message: "If user exists, a password reset link has been sent.",
      };
    }

    const token = `${uuidv4()}`;
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1h

    await db.insert(passwordResetTokens).values({
      token,
      expires,
      userId: user.id,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const resetLink = `http://${process.env.NEXT_PUBLIC_APP_URL}${paths.app.auth.forgotPasswordConfirm(token)}`;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tinbukovina1c@gmail.com" /* email */,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    return {
      status: "success",
      message: "A password reset link ahs been sent.",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Something went wrong." };
  }
}

export async function resetPassword(
  formData: z.infer<typeof resetPasswordSchema>,
): Promise<ActionState> {
  const validatedFields = resetPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { status: "error", message: "Invalid data provided." };
  }

  const { password, token } = validatedFields.data;

  try {
    const resetToken = await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });

    if (!resetToken || new Date() > resetToken.expires) {
      return { status: "error", message: "Invalid or expired token." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db
      .update(users)
      .set({ passwordHash })
      .where(eq(users.id, resetToken.userId));

    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, resetToken.id));

    return {
      status: "success",
      message: "Password has been reset successfully.",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Something went wrong." };
  }
}
