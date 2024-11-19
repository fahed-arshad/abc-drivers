"use client";

import Link from "next/link";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

function Header({ className }: HeaderProps) {
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
          email@mail.com
        </p>
        <p className="text-primary text-xl font-light">English</p>
      </header>
    </div>
  );
}

export default Header;
