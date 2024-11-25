import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { CheckCircleIcon } from 'lucide-react';

type FileUploadedBlockProps = {
  title: string;
  description: string;
  url: string;
};

function FileUploadedBlock({ title, description, url }: FileUploadedBlockProps) {
  const t = useTranslations('fileUploadedBlock');
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs">{description}</p>
      <div className="border-2 border-input border-dashed px-4 py-5 flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-row items-center justify-center text-center w-fit mx-auto">
          <CheckCircleIcon className="w-4 h-4 text-center" />
          <p className="text-sm font-semibold">{t('title')}</p>
        </div>
        <Link href={url} target="_blank">
          <Button type="button" variant="outline">
            {t('cta')}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FileUploadedBlock;
