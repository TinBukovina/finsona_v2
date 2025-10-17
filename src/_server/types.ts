import z from "zod";

export const signinSchema = z.object({
  email: z.email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Min 8 characters" }),
});
