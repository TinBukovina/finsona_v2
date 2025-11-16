import { appRouter } from ".";
import { createContext } from "./context";

export const serverClient = appRouter.createCaller(createContext());
