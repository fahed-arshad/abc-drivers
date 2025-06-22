'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Headline from '../components/headline';
import { Separator } from '@/components/ui/separator';
import AvailabilityBlock, { Availability, Days } from './components/availability-block';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import useApi from '@/hooks/api/useApi';
import { useUser } from '@/hooks/useUser';

import { ClockIcon } from 'lucide-react';
import dayjs from 'dayjs';

function OperatingHoursPage() {
  const { user } = useUser();
  const { drivers } = useApi();
  const t = useTranslations('dashboard.operatingHoursPage');

  const queryClient = useQueryClient();

  const { data: driver, isPending } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const getInitialAvailabilities = (initialAvailabilities: any[]) => {
    return (
      initialAvailabilities?.map((oh: any) => ({
        day: oh.day,
        isAvailable: true,
        open: oh.open,
        close: oh.close
      })) || []
    );
  };

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [operating24Hours, setOperating24Hours] = useState(false);

  useEffect(() => {
    if (driver?.operatingHours.length <= 0) {
      setOperating24Hours(true);
    } else {
      setOperating24Hours(false);
      setAvailabilities(getInitialAvailabilities(driver?.operatingHours));
    }
  }, [driver?.operatingHours]);

  const { mutateAsync: editDriverAvailabilityMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriverAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver availability updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update driver availability.');
    }
  });

  const getAvailability = (day: string): Availability => {
    const found = availabilities.find((a) => a.day === day);
    if (found) return found;

    return {
      day: day as any,
      isAvailable: false,
      open: '09:00',
      close: '16:00'
    };
  };

  const isCloseTimeBeforeOpenTime = (availability: Availability): boolean => {
    const baseDate = dayjs();
    const closeTime = dayjs(`${baseDate.format('YYYY-MM-DD')} ${availability.close}`);
    const openTime = dayjs(`${baseDate.format('YYYY-MM-DD')} ${availability.open}`);
    return closeTime.isBefore(openTime);
  };

  const handleAvailabilityChange = (availability: Availability) => {
    if (availability.isAvailable) {
      if (isCloseTimeBeforeOpenTime(availability)) {
        toast.error('Close time cannot be before open time.');
        return;
      }

      const found = availabilities.find((a) => a.day === availability.day);
      if (found) {
        // Remove the availability from the list
        const newAvailabilities = availabilities.filter((a) => a.day !== availability.day);

        // Add the updated availability to the list
        newAvailabilities.push(availability);

        setAvailabilities(newAvailabilities);
      } else {
        setAvailabilities([...availabilities, availability]);
      }
    } else {
      // Remove the availability from the list
      setAvailabilities(availabilities.filter((a) => a.day !== availability.day));
    }
  };

  const handleSubmit = async () => {
    if (operating24Hours) {
      await editDriverAvailabilityMutation([]);
      return;
    }

    if (availabilities.length === 0) return;

    // Check if any close time is before open time
    const invalidAvailabilities = availabilities.filter((availability) => isCloseTimeBeforeOpenTime(availability));

    if (invalidAvailabilities.length > 0) {
      toast.error('Close time cannot be before open time.');
      return;
    }

    await editDriverAvailabilityMutation(
      availabilities.map((availability) => ({
        day: availability.day,
        open: availability.open,
        close: availability.close
      }))
    );
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title={t('title')} icon={ClockIcon} />
        <Separator />
      </div>

      <div className="flex items-center flex-wrap space-x-2 border rounded-lg px-4 py-6 mt-8">
        <Switch id="24hours" checked={operating24Hours} onCheckedChange={setOperating24Hours} />
        <Label htmlFor="24hours">{t('operating24Hours')}</Label>
      </div>

      {!operating24Hours && !isPending && (
        <div className="mt-8 space-y-4 px-4 max-w-2xl">
          {Days.map((day) => (
            <AvailabilityBlock key={day} availability={getAvailability(day)} onChange={handleAvailabilityChange} />
          ))}
        </div>
      )}

      <Button loading={isEditing} onClick={handleSubmit} className="mt-4">
        {t('cta')}
      </Button>
    </div>
  );
}

export default OperatingHoursPage;
