import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/_server";

export const trpc = createTRPCReact<AppRouter>({});
