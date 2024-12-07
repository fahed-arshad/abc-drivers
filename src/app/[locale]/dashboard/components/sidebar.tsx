'use client';

import useWindowSize from '@/hooks/useWindowSize';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

import { Button } from '@/components/ui/button';

import { BanknoteIcon, BriefcaseBusinessIcon, CircleDollarSignIcon, CircleHelpIcon, ClockIcon, FilesIcon, FileUserIcon, ScaleIcon, UserIcon } from 'lucide-react';

function Sidebar() {
  const { isMobile } = useWindowSize();

  if (isMobile) return <MobileSidebar />;

  return <DesktopSidebar />;
}

export default Sidebar;

const SidebarTabs = {
  main: [
    {
      icon: UserIcon,
      label: 'My Information',
      href: '/dashboard/my-information'
    },
    {
      icon: ClockIcon,
      label: 'Operating Hours',
      href: '/dashboard/operating-hours'
    },
    {
      icon: BanknoteIcon,
      label: 'Services Available',
      href: '/dashboard/services-available'
    },
    {
      icon: CircleDollarSignIcon,
      label: 'Payment',
      href: '/dashboard/payment'
    },
    {
      icon: BriefcaseBusinessIcon,
      label: 'Business Information',
      href: '/dashboard/business-information'
    },
    {
      icon: FilesIcon,
      label: 'Driver Documents',
      href: '/dashboard/driver-documents'
    }
  ],
  legal: [
    {
      icon: FileUserIcon,
      label: 'Partner Agreement',
      href: 'https://abc-emergency.com/terms-and-conditions'
    },
    {
      icon: ScaleIcon,
      label: 'Partner Policy',
      href: 'https://abc-emergency.com/terms-and-conditions'
    },
    {
      icon: CircleHelpIcon,
      label: 'Support',
      href: 'https://abc-emergency.com/terms-and-conditions'
    }
  ]
};

function MobileSidebar() {
  return (
    <div className="border-r border-input h-full">
      {/* <MenuIcon /> */}
      <div className="flex flex-col">
        {SidebarTabs.main.map((tab) => (
          <MobileSidebarTab key={tab.label} {...tab} />
        ))}
      </div>
      <div className="flex flex-col mt-16">
        {SidebarTabs.legal.map((tab) => (
          <MobileSidebarTab key={tab.label} {...tab} />
        ))}
      </div>
    </div>
  );
}

type MobileSidebarTabProps = {
  icon: React.ComponentType;
  label: string;
  href: string;
};

function MobileSidebarTab({ icon: Icon, label, href }: MobileSidebarTabProps) {
  const path = usePathname();
  const isActive = path === href;
  const activeLinkStyle = 'border-l-2 border-primary';

  return (
    <Link href={href} className={`${isActive && activeLinkStyle}`}>
      <Button variant="ghost" size="lg">
        <Icon />
      </Button>
    </Link>
  );
}

function DesktopSidebar() {
  return (
    <div className="border-r border-input h-full py-10">
      {/* <MenuIcon /> */}
      <div className="flex flex-col">
        {SidebarTabs.main.map((tab) => (
          <DesktopSidebarTab key={tab.label} {...tab} />
        ))}
      </div>
      <div className="flex flex-col mt-16">
        {SidebarTabs.legal.map((tab) => (
          <DesktopSidebarTab key={tab.label} {...tab} />
        ))}
      </div>
    </div>
  );
}

type DesktopSidebarTabProps = {
  icon: React.ComponentType;
  label: string;
  href: string;
};

function DesktopSidebarTab({ icon: Icon, label, href }: DesktopSidebarTabProps) {
  const path = usePathname();
  const isActive = path === href;
  const t = useTranslations('dashboardSidebar');
  const activeLinkStyle = 'border-l-2 border-primary';

  return (
    <Link href={href} className={`w-full ${isActive && activeLinkStyle}`}>
      <Button variant="ghost" size="lg" className="w-full flex flex-row justify-start items-center">
        <Icon /> <span className="ml-2">{t(label)}</span>
      </Button>
    </Link>
  );
}
