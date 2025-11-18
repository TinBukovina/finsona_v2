// Place where I will put data that I want to have on every procedure (request), so I have to pass it manually

export function createContext() {
  return {};
}

export type Context = ReturnType<typeof createContext>;
