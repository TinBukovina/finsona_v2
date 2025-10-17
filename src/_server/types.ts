import z from "zod";

export const signinSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Min 8 characters" }),
});

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Min 1 characters" }),
  surname: z.string().min(1, { message: "Min 1 characters" }),
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Min 8 characters" }),
});
