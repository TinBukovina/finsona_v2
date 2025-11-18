import { settingsUpdatePartial } from "@/_server/schemas/settings";
import {
  getUserSettings,
  updateUserSettings,
} from "@/_server/services/settings";
import { createTRPCRouter, publicProcedure } from "@/_server/api/trpc";
import z from "zod";

export const settingsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
      }),
    )
    .query(async ({ input }) => {
      return getUserSettings(input.userId);
    }),
  update: publicProcedure
    .input(settingsUpdatePartial.extend({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const { userId, ...data } = input;
      return updateUserSettings(userId, data);
    }),
});
