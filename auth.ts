import { db } from "@/_db/drizzle";
import { accounts, sessions, users, verificationTokens } from "@/_db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z, { ZodError } from "zod";

export const signInSchema = z.object({
  email: z
    .string() // Uklonjen je objekt s greškom odavde
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string() // I odavde
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // 1. Validacija ulaznih podataka sa Zod-om
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // 2. Traženje korisnika u bazi
          const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
          });

          // 3. Provjera postoji li korisnik i ima li lozinku
          if (!user || !user.passwordHash) {
            return null;
          }

          // 4. Usporedba lozinki
          const isPasswordMatch = await bcrypt.compare(
            password,
            user.passwordHash,
          );

          if (!isPasswordMatch) {
            return null;
          }

          // 5. Vraćanje korisnika ako je sve u redu
          return user;
        } catch (error) {
          // Ako validacija ne uspije, Zod će baciti grešku
          if (error instanceof ZodError) {
            return null; // Vraćamo null da Auth.js zna da prijava nije uspjela
          }
          // Za sve ostale greške, najbolje ih je ne skrivati
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
