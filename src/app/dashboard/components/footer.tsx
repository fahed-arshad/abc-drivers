"use client";

import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { twMerge } from "tailwind-merge";

type FooterProps = React.HTMLAttributes<HTMLDivElement>;

function Footer({ className }: FooterProps) {
  const { signOut } = useAuth();
  return (
    <footer
      className={twMerge(
        "h-14 w-full bg-gray-100 flex flex-row items-center justify-center",
        className
      )}
    >
      <div className="flex flex-row items-center gap-8">
        <FooterLink label="Sign Out" onClick={async () => await signOut()} />
        <FooterLink label="Support" href="/terms-of-service" />
        <FooterLink label="Terms of Service" href="/privacy-policy" />
        <FooterLink label="Privacy Policy" href="/contact-us" />
      </div>
    </footer>
  );
}

export default Footer;

type FooterLinkProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

function FooterLink({ label, href, onClick }: FooterLinkProps) {
  if (href)
    return (
      <Link href={href} target="_blank" className="text-neutral-700 text-sm">
        {label}
      </Link>
    );
  if (onClick)
    return (
      <Button
        variant="link"
        onClick={onClick}
        className="text-neutral-700 text-sm hover:no-underline"
      >
        {label}
      </Button>
    );
  return <span>{label}</span>;
}

const SocialMedia = [
  {
    name: "Facebook",
    icon: "/icons/facebook.svg",
  },
];