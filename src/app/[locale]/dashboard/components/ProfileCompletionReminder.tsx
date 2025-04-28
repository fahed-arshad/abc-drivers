'use client';

import { useState, useEffect } from 'react';

import { useRouter } from '@/i18n/routing';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type ProfileCompletionReminderProps = {
  driver: {
    firstName?: string;
    lastName?: string;
    services: string[];
    operatingHours?: any[];
    documents?: any[];
    business?: any;
    bankAccount?: any;
    vehicle?: any;
  };
};

export function ProfileCompletionReminder({ driver }: ProfileCompletionReminderProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const getIncompleteSections = () => {
    const sections = [];

    if (!driver.firstName || !driver.lastName) {
      sections.push('Personal Information');
    }

    if (!driver.services || driver.services.length === 0) {
      sections.push('Services');
    }

    if (!driver.operatingHours || driver.operatingHours.length === 0) {
      sections.push('Operating Hours');
    }

    if (!driver.documents || driver.documents.length === 0) {
      sections.push('Documents');
    }

    if (!driver.business) {
      sections.push('Business Information');
    }

    if (!driver.bankAccount) {
      sections.push('Bank Account Information');
    }

    if (!driver.vehicle) {
      sections.push('Vehicle Information');
    }

    return sections;
  };

  useEffect(() => {
    const incompleteSections = getIncompleteSections();
    if (incompleteSections.length > 0) {
      setOpen(true);
    }
  }, [driver]);

  const handleCompleteProfile = () => {
    router.push('/dashboard/my-information');
    setOpen(false);
  };

  const incompleteSections = getIncompleteSections();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            Complete Your Profile
          </DialogTitle>
          <DialogDescription>Please complete the following sections of your profile to ensure smooth operation:</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="list-disc pl-4 space-y-2">
            {incompleteSections.map((section) => (
              <li key={section} className="text-sm text-gray-600">
                {section}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Remind me later
          </Button>
          <Button onClick={handleCompleteProfile}>Complete Profile</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
