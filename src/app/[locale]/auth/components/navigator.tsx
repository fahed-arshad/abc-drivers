import { useEffect, useState } from 'react';

import { Link } from '@/i18n/routing';

import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';

type NavigatorProps = React.HTMLAttributes<HTMLDivElement>;

function Navigator({ className }: NavigatorProps) {
  const t = useTranslations('authNavigator');
  const [activeLink, setActiveLink] = useState<'sign-up' | 'sign-in'>('sign-in');

  useEffect(() => {
    if (window.location.pathname.includes('sign-up')) {
      setActiveLink('sign-up');
    } else if (window.location.pathname.includes('sign-in')) {
      setActiveLink('sign-in');
    }
  }, []);

  const activeLinkStyle = 'text-primary border-b-2 border-primary';

  return (
    <div className={twMerge('flex flex-row items-center gap-8 py-4 text-white', className)}>
      <Link href="/auth/sign-up" className={`text-xl py-2 ${activeLink === 'sign-up' && activeLinkStyle}`}>
        {t('signUp')}
      </Link>
      <Link href="/auth/sign-in" className={`text-xl py-2 ${activeLink === 'sign-in' && activeLinkStyle}`}>
        {t('login')}
      </Link>
    </div>
  );
}

export default Navigator;
