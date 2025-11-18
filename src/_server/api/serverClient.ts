import { createContext } from "./context";
import { appRouter } from "./router";

export const serverClient = appRouter.createCaller(createContext());
