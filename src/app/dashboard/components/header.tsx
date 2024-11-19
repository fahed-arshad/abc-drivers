"use client";

import Link from "next/link";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

import { useUser } from "@/hooks/useUser";

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

function Header({ className }: HeaderProps) {
  const { user } = useUser();

  return (
    <div className={twMerge("bg-secondary px-4 py-4 h-28", className)}>
      <header className="container flex flex-row items-center justify-between">
        <Link href="https://abc-emergency.com">
          <Image
            src="/logo.svg"
            alt="ABC Emergency Logo"
            width={130}
            height={80}
          />
        </Link>
        <p className="hidden lg:inline-block text-white text-sm font-light">
          {user?.emailAddresses[0].emailAddress}
        </p>
        <p className="text-primary text-xl font-light">English</p>
      </header>
    </div>
  );
}

export default Header;
