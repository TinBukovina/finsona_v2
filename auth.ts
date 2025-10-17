import { db } from "@/_db/drizzle";
import { accounts, sessions, users, verificationTokens } from "@/_db/schema";
import { signinSchema } from "@/_server/types";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

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
        console.log("\n--- START authorize function ---"); // DEBUG LOG A
        try {
          // 1. Validacija ulaznih podataka sa Zod-om
          const { email, password } =
            await signinSchema.parseAsync(credentials);

          if (!email || !password) {
            return null;
          }

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

          console.log("USER: ", user);
          return user;
        } catch (error) {
          // Ako validacija ne uspije, Zod će baciti grešku
          console.error("--- UNHANDLED ERROR IN authorize ---", error); // DEBUG LOG J
          // Vraćanjem null sprječavamo potpuni pad aplikacije
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
