import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
}

export function Typography({ children }: TypographyProps) {
  return <p>{children}</p>;
}
