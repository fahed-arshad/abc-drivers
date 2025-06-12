'use client';

import { useState } from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

import { useUser } from '@/hooks/useUser';

import { BanknoteIcon, BriefcaseBusinessIcon, CircleDollarSignIcon, CircleHelpIcon, ClockIcon, FilesIcon, FileUserIcon, MenuIcon, ScaleIcon, UserIcon } from 'lucide-react';

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
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  return (
    <div className="w-fit border-r border-input h-full overflow-y-auto overflow-x-hidden">
      <Button variant="ghost" size="lg" className="w-full" onClick={() => setOpen(!open)}>
        <MenuIcon />
      </Button>
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
      <Sheet open={open} onOpenChange={(opened) => setOpen(opened)}>
        <SheetContent side="left" className="w-[250px] top-28 h-[calc(100vh-112px)] px-0">
          <div className="h-full py-10  overflow-x-hidden">
            <div className="flex flex-col overflow-y-auto">
              {SidebarTabs.main.map((tab) => (
                <DesktopSidebarTab key={tab.label} {...tab} />
              ))}
              <Separator className="my-2" />
              {SidebarTabs.legal.map((tab) => (
                <DesktopSidebarTab key={tab.label} {...tab} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-center">{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </SheetContent>
      </Sheet>
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
      <Button variant="ghost" size="lg" className="w-full">
        <Icon />
      </Button>
    </Link>
  );
}

function DesktopSidebar() {
  return (
    <div className="w-fit border-r border-input h-full py-10 overflow-y-auto overflow-x-hidden">
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
