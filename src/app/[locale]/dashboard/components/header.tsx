'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

import { twMerge } from 'tailwind-merge';

import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { ChevronDownIcon } from 'lucide-react';

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  locale: string;
};

function Header({ className, locale }: HeaderProps) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('dashboardHeader');

  const label = locale === 'en' ? 'English' : 'الإنجليزية';

  const handleLocaleChange = (selectedLocale: string) => {
    router.push(pathname, { locale: selectedLocale });
  };

  return (
    <div className={twMerge('bg-secondary px-4 py-4 h-28', className)}>
      <header className="container flex flex-row items-center justify-between">
        <Link href="https://abc-emergency.com">
          <Image src="/logo.svg" alt="ABC Emergency Logo" width={130} height={80} />
        </Link>
        <p className="hidden lg:inline-block text-white text-sm font-light">{user?.emailAddresses[0].emailAddress}</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row items-center gap-2 text-primary text-xl font-light cursor-pointer">
            {label}
            <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleLocaleChange('en');
              }}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleLocaleChange('ar');
              }}
            >
              الإنجليزية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}

export default Header;
