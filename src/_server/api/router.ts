import { settingsRouter } from "./routers/settings";
import { createTRPCRouter } from "./trpc";

// Place for defining all procedures for frontend to call
export const appRouter = createTRPCRouter({
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
