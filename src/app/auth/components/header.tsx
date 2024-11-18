"use client";

import Link from "next/link";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

import { Button } from "@/components/ui/button";

type HeaderProps = React.HTMLAttributes<HTMLDivElement>;

function Header({ className }: HeaderProps) {
  return (
    <div className={twMerge(className, "bg-secondary px-4 py-4 h-28")}>
      <header className="container flex flex-row items-center justify-between">
        <Button
          variant="link"
          className="text-xl font-light hover:no-underline"
          onClick={() => {}}
        >
          BACK
        </Button>
        <Link href="https://abc-emergency.com">
          <Image
            src="/logo.svg"
            alt="ABC Emergency Logo"
            width={130}
            height={80}
          />
        </Link>
        <p className="text-primary text-xl font-light">English</p>
      </header>
    </div>
  );
}

export default Header;
