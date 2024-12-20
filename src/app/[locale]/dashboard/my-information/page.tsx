import { useTranslations } from 'next-intl';

import Headline from '../components/headline';
import { Separator } from '@/components/ui/separator';
import DriverInformation from './components/driver-information';
import VehicleInformation from './components/vehicle-information';

import { UserIcon } from 'lucide-react';

function MyInformationPage() {
  const t = useTranslations('dashboard.myInformationPage');

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title={t('title')} icon={UserIcon} />
        <Separator />
      </div>
      <DriverInformation className="mt-8" />
      <VehicleInformation className="mt-8" />
    </div>
  );
}

export default MyInformationPage;
