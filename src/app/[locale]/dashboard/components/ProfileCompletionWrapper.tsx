'use client';

import useApi from '@/hooks/api/useApi';
import { useQuery } from '@tanstack/react-query';
import { ProfileCompletionReminder } from './ProfileCompletionReminder';

type DriverData = {
  firstName?: string;
  lastName?: string;
  services: string[];
  operatingHours?: any[];
  documents?: any[];
  business?: any;
  bankAccount?: any;
  vehicle?: any;
};

export function ProfileCompletionWrapper() {
  const api = useApi();

  // Use React Query to fetch and cache driver data
  const {
    data: driver,
    isLoading,
    error
  } = useQuery<DriverData>({
    queryKey: ['driverProfile'],
    queryFn: () => api.drivers.getDriver(),
    // Don't show the reminder if there's an error fetching data
    enabled: true
  });

  // Don't render anything while loading or if there's an error
  if (isLoading || error || !driver) {
    return null;
  }

  return <ProfileCompletionReminder driver={driver} />;
}
