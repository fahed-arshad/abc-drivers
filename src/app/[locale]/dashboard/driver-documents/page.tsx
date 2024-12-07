'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import Headline from '../components/headline';
import { Separator } from '@/components/ui/separator';
import FileUploadBlock from '../components/file-upload-block';
import FileUploadedBlock from '../components/file-uploaded-block';

import { useUser } from '@/hooks/useUser';
import useApi from '@/hooks/api/useApi';

import { FilesIcon } from 'lucide-react';

const formSchema = z.object({
  vehicleInsuranceUrl: z.string().url().optional(),
  vehicleOwnershipUrl: z.string().url().optional(),
  driverLicenseUrl: z.string().url().optional(),
  identificationCardUrl: z.string().url().optional()
});

type FormProps = z.infer<typeof formSchema>;

function DriverDocumentsPage() {
  const { user } = useUser();
  const { drivers } = useApi();
  const t = useTranslations('dashboard.driverDocumentsPage');

  const queryClient = useQueryClient();

  const { data: driver, isPending } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const { mutateAsync: editDocumentsMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriverDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Documents updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update documents.');
    }
  });

  const getInitialValues = () => {
    const documents = driver?.documents as any[];
    return {
      vehicleInsuranceUrl: documents?.find((doc) => doc?.type === 'INSURANCE')?.url || '',
      vehicleOwnershipUrl: documents?.find((doc) => doc?.type === 'OWNERSHIP')?.url || '',
      driverLicenseUrl: documents?.find((doc) => doc?.type === 'LICENSE')?.url || '',
      identificationCardUrl: documents?.find((doc) => doc?.type === 'ID')?.url || ''
    };
  };

  const form = useForm<FormProps>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleInsuranceUrl: '',
      vehicleOwnershipUrl: '',
      driverLicenseUrl: '',
      identificationCardUrl: ''
    },
    values: getInitialValues()
  });

  const handleFileUploaded = (fileName: string, data: any) => {
    form.setValue(fileName as any, data?.url);
  };

  const handleSubmit = async (data: FormProps) => {
    const documents = [];
    if (data.vehicleInsuranceUrl) {
      documents.push({ type: 'INSURANCE', url: data.vehicleInsuranceUrl });
    }
    if (data.vehicleOwnershipUrl) {
      documents.push({ type: 'OWNERSHIP', url: data.vehicleOwnershipUrl });
    }
    if (data.driverLicenseUrl) {
      documents.push({ type: 'LICENSE', url: data.driverLicenseUrl });
    }
    if (data.identificationCardUrl) {
      documents.push({ type: 'ID', url: data.identificationCardUrl });
    }
    await editDocumentsMutation(documents);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title={t('title')} icon={FilesIcon} />
        <Separator />
      </div>

      {!isPending && (
        <div className="mt-8">
          <Form {...form}>
            <form className="space-y-2 w-full mx-auto md:w-[750px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24" onSubmit={form.handleSubmit(handleSubmit)}>
              {form.watch('vehicleInsuranceUrl') ? (
                <FileUploadedBlock title={t('insuranceUploadField.title')} description={t('insuranceUploadField.description')} url={form.watch('vehicleInsuranceUrl')!} />
              ) : (
                <FileUploadBlock
                  title={t('insuranceUploadField.title')}
                  description={t('insuranceUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('vehicleInsuranceUrl', data)}
                />
              )}

              {form.watch('vehicleOwnershipUrl') ? (
                <FileUploadedBlock
                  title={t('vehicleOwnershipUploadField.title')}
                  description={t('vehicleOwnershipUploadField.description')}
                  url={form.watch('vehicleOwnershipUrl')!}
                />
              ) : (
                <FileUploadBlock
                  title={t('vehicleOwnershipUploadField.title')}
                  description={t('vehicleOwnershipUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('vehicleOwnershipUrl', data)}
                />
              )}

              {form.watch('driverLicenseUrl') ? (
                <FileUploadedBlock title={t('licenseUploadField.title')} description={t('licenseUploadField.description')} url={form.watch('driverLicenseUrl')!} />
              ) : (
                <FileUploadBlock
                  title={t('licenseUploadField.title')}
                  description={t('licenseUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('driverLicenseUrl', data)}
                />
              )}

              {form.watch('identificationCardUrl') ? (
                <FileUploadedBlock title={t('idUploadField.title')} description={t('idUploadField.description')} url={form.watch('identificationCardUrl')!} />
              ) : (
                <FileUploadBlock
                  title={t('idUploadField.title')}
                  description={t('idUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('identificationCardUrl', data)}
                />
              )}

              <div className="flex justify-center">
                <Button type="submit" size="lg" loading={isEditing} className="text-lg font-semibold">
                  {t('cta')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

export default DriverDocumentsPage;
