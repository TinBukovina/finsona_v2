"use client";

import { AppleIcon, cn, EmailFillIcon, GoogleIcon } from "@/_client/6_shared";
import { useRouter } from "next/navigation";

interface SocialButtonProps {
  loginType: "email" | "google" | "apple";
  disabled: boolean;
}

const socialLinksData = [
  {
    name: "email",
    link: "/auth/email-login",
    icon: EmailFillIcon,
  },
  {
    name: "google",
    link: "/auth/google-login",
    icon: GoogleIcon,
  },
  {
    name: "apple",
    link: "/auth/apple-login",
    icon: AppleIcon,
  },
];

export function SocialButton({ loginType, disabled }: SocialButtonProps) {
  const router = useRouter();

  const socialLink = socialLinksData.find((link) => link.name === loginType);

  if (!socialLink) return null;

  const IconComponent = socialLink?.icon;

  return (
    <button
      disabled={disabled}
      onClick={() => {
        router.push(socialLink.link);
      }}
      className={cn(
        "bg-secondary border-border hover:bg-secondary/80 focus:border-primary focus:outline-primary/25 text-secondary-foreground flex w-full items-center justify-center rounded-md border-[1px] py-3 outline-transparent transition-all duration-200 ease-out hover:cursor-pointer focus:outline-[3px] active:scale-98",
        {
          "bg-muted text-muted-foreground": disabled,
        },
      )}
    >
      <IconComponent className="h-[24px] w-[24px]" />
    </button>
  );
}
