import { db } from "@/_db/drizzle";
import { publicProcedure, router } from "./trpc";
import { budgetItems } from "@/_db/schema";
import z from "zod";
import { eq } from "drizzle-orm";

export const appRouter = router({
  // 1. READ (Dohvat)
  getBudgetItems: publicProcedure.query(async () => {
    console.log("tRPC: Dohvaćanje svih budget items...");
    return await db.select().from(budgetItems).orderBy(budgetItems.id);
  }),

  // 2. CREATE (Unos)
  createBudgetItem: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Ime je obavezno."),
        category: z.string().min(1, "Kategorija je obavezna."),
        plannedAmount: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log("tRPC: Kreiranje novog budget item:", input);
      await db.insert(budgetItems).values(input);
      return { success: true };
    }),

  // 3. UPDATE (Ažuriranje)
  updateBudgetItem: publicProcedure
    .input(
      z.object({
        id: z.number(),
        newName: z.string().min(1, "Novo ime je obavezno."),
      }),
    )
    .mutation(async ({ input }) => {
      console.log("tRPC: Ažuriranje budget item:", input);
      await db
        .update(budgetItems)
        .set({ name: input.newName })
        .where(eq(budgetItems.id, input.id));
      return { success: true };
    }),

  // 4. DELETE (Brisanje)
  deleteBudgetItem: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      console.log("tRPC: Brisanje budget item s ID:", input.id);
      await db.delete(budgetItems).where(eq(budgetItems.id, input.id));
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
