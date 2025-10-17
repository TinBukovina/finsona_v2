"use client";

import Link from "next/link";
import { cn } from "../../lib";

interface RedirectLinkProps {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
}

export function RedirectLink({
  children,
  href,
  disabled = false,
}: RedirectLinkProps) {
  if (disabled) {
    return (
      <p className="text-muted-foreground inline-block font-semibold">
        {children}
      </p>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "text-primary font-semibold hover:cursor-pointer hover:underline",
      )}
    >
      {children}
    </Link>
  );
}
