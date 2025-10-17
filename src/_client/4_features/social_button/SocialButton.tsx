"use client";

import { AppleIcon, EmailFillIcon, GoogleIcon } from "@/_client/6_shared";
import { useRouter } from "next/navigation";

interface SocialButtonProps {
  loginType: "email" | "google" | "apple";
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

export function SocialButton({ loginType }: SocialButtonProps) {
  const router = useRouter();

  const socialLink = socialLinksData.find((link) => link.name === loginType);

  if (!socialLink) return null;

  const IconComponent = socialLink?.icon;

  return (
    <button
      onClick={() => {
        router.push(socialLink.link);
      }}
      className="bg-secondary border-border hover:bg-secondary/80 focus:border-primary focus:outline-primary/25 flex w-full items-center justify-center rounded-md border py-3 outline-transparent transition-all duration-200 ease-out hover:cursor-pointer focus:outline-[3px] active:scale-98"
    >
      <IconComponent className="text-secondary-foreground h-[24px] w-[24px]" />
    </button>
  );
}
