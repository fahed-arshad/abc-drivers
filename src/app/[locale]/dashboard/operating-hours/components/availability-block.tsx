import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Autocomplete } from '@/components/ui/autocomplete';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import { Hours } from '../data/hours';

export const Days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] as const;

type Day = (typeof Days)[number];

export type Availability = {
  isAvailable: boolean;
  day: Day;
  open: string;
  close: string;
};

type AvailabilityBlockProps = {
  availability: Availability;
  onChange: (availability: Availability) => void;
};

function AvailabilityBlock({ availability, onChange }: AvailabilityBlockProps) {
  const [open, setOpen] = useState(availability.open);
  const [close, setClose] = useState(availability.close);
  const t = useTranslations('dashboard.operatingHoursPage');
  const [isAvailable, setIsAvailable] = useState(availability.isAvailable);

  useEffect(() => {
    setOpen(availability.open);
    setClose(availability.close);
    setIsAvailable(availability.isAvailable);
  }, [availability]);

  const getDay = (day: Day) => {
    switch (day) {
      case 'SUNDAY':
        return t('sunday');
      case 'MONDAY':
        return t('monday');
      case 'TUESDAY':
        return t('tuesday');
      case 'WEDNESDAY':
        return t('wednesday');
      case 'THURSDAY':
        return t('thursday');
      case 'FRIDAY':
        return t('friday');
      case 'SATURDAY':
        return t('saturday');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-center flex-wrap space-x-2">
        <Switch
          id="available"
          checked={isAvailable}
          onCheckedChange={(checked) => {
            setIsAvailable(checked);
            onChange({ ...availability, isAvailable: checked });
          }}
        />
        <Label htmlFor="available">{getDay(availability.day)}</Label>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Autocomplete
          disabled={!isAvailable}
          items={Hours.map((hour) => ({
            label: hour,
            value: hour
          }))}
          placeholder="Open"
          searchValue={open}
          onSearchValueChange={setOpen}
          selectedValue={availability.open}
          onSelectedValueChange={(value) => onChange({ ...availability, isAvailable, open: value })}
        />
        <p>-</p>
        <Autocomplete
          disabled={!isAvailable}
          items={Hours.map((hour) => ({
            label: hour,
            value: hour
          }))}
          placeholder="Close"
          searchValue={close}
          onSearchValueChange={setClose}
          selectedValue={availability.close}
          onSelectedValueChange={(value) => onChange({ ...availability, isAvailable, close: value })}
        />
      </div>
    </div>
  );
}

export default AvailabilityBlock;
