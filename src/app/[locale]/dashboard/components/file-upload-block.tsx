import { useRef } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import useApi from '@/hooks/api/useApi';

type FileUploadBlockProps = {
  title: string;
  description: string;
  onUploadFinished: (data: any) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function FileUploadBlock({ title, description, onUploadFinished }: FileUploadBlockProps) {
  const { storage } = useApi();
  const t = useTranslations('fileUploadBlock');
  const fileRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFileMutation, isPending: isUploading } = useMutation({
    mutationFn: storage.uploadFile,
    onSuccess: (data) => {
      onUploadFinished(data);
      toast.success('File uploaded successfully.');
    },
    onError: () => {
      toast.error('Failed to upload file.');
    }
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size exceeds the limit of 5MB.');
        return;
      }

      await uploadFileMutation(file);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs">{description}</p>
      <div className="border-2 border-input border-dashed px-4 py-5 flex flex-col items-center justify-center space-y-2">
        <p className="text-sm font-semibold">{t('title')}</p>
        <p className="text-xs">{t('description')}</p>
        <Button
          loading={isUploading}
          onClick={(e) => {
            e.preventDefault();
            fileRef.current?.click();
          }}
        >
          {t('cta')}
        </Button>
        <input type="file" ref={fileRef} onChange={handleUpload} style={{ display: 'none' }} />
      </div>
    </div>
  );
}

export default FileUploadBlock;
