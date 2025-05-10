'use client';

import z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';

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
  vehicleInsurance: z.object({
    fileId: z.string().min(1, 'Required'),
    url: z.string().url().min(1, 'Required')
  }),
  vehicleOwnership: z.object({
    fileId: z.string().min(1, 'Required'),
    url: z.string().url().min(1, 'Required')
  }),
  driverLicense: z.object({
    fileId: z.string().min(1, 'Required'),
    url: z.string().url().min(1, 'Required')
  }),
  identificationCard: z.object({
    fileId: z.string().min(1, 'Required'),
    url: z.string().url().min(1, 'Required')
  })
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

  const { mutateAsync: createDocumentsMutation, isPending: isCreatingDocument } = useMutation({
    mutationFn: drivers.createDriverDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Documents created successfully.');
    }
  });

  // const { mutateAsync: editDocumentsMutation, isPending: isEditing } = useMutation({
  //   mutationFn: drivers.editDriverDocuments,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
  //     toast.success('Documents updated successfully.');
  //   },
  //   onError: () => {
  //     toast.error('Failed to update documents.');
  //   }
  // });

  const getInitialValues = () => {
    const documents = driver?.documents as any[];
    return {
      vehicleInsurance: {
        fileId: documents?.find((doc) => doc?.type === 'INSURANCE')?.file?.id || '',
        url: documents?.find((doc) => doc?.type === 'INSURANCE')?.file?.url || ''
      },
      vehicleOwnership: {
        fileId: documents?.find((doc) => doc?.type === 'OWNERSHIP')?.file?.id || '',
        url: documents?.find((doc) => doc?.type === 'OWNERSHIP')?.file?.url || ''
      },
      driverLicense: {
        fileId: documents?.find((doc) => doc?.type === 'LICENSE')?.file?.id || '',
        url: documents?.find((doc) => doc?.type === 'LICENSE')?.file?.url || ''
      },
      identificationCard: {
        fileId: documents?.find((doc) => doc?.type === 'ID')?.file?.id || '',
        url: documents?.find((doc) => doc?.type === 'ID')?.file?.url || ''
      }
    };
  };

  const form = useForm<FormProps>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleInsurance: {
        fileId: '',
        url: ''
      },
      vehicleOwnership: {
        fileId: '',
        url: ''
      },
      driverLicense: {
        fileId: '',
        url: ''
      },
      identificationCard: { fileId: '', url: '' }
    },
    values: getInitialValues()
  });

  const handleFileUploaded = (fileName: string, data: { id: string; url: string }) => {
    form.setValue(fileName as any, { fileId: data.id, url: data.url });
  };

  console.log('form', form.watch());

  const handleSubmit = (data: FormProps) => {
    const documents = [];
    if (data.vehicleInsurance.url) {
      documents.push({ type: 'INSURANCE', fileId: data.vehicleInsurance.fileId });
    }
    if (data.vehicleOwnership.url) {
      documents.push({ type: 'OWNERSHIP', fileId: data.vehicleOwnership.fileId });
    }
    if (data.driverLicense.url) {
      documents.push({ type: 'LICENSE', fileId: data.driverLicense.fileId });
    }
    if (data.identificationCard.url) {
      documents.push({ type: 'ID', fileId: data.identificationCard.fileId });
    }

    if (documents.length === 0) return toast.error('Please upload at least one document.');

    // await editDocumentsMutation(documents);
    createDocumentsMutation(documents);
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
              {form.watch('vehicleInsurance.url') ? (
                <FileUploadedBlock title={t('insuranceUploadField.title')} description={t('insuranceUploadField.description')} url={form.watch('vehicleInsurance.url')!} />
              ) : (
                <FileUploadBlock
                  title={t('insuranceUploadField.title')}
                  description={t('insuranceUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('vehicleInsurance', data)}
                />
              )}

              {form.watch('vehicleOwnership.url') ? (
                <FileUploadedBlock
                  title={t('vehicleOwnershipUploadField.title')}
                  description={t('vehicleOwnershipUploadField.description')}
                  url={form.watch('vehicleOwnership.url')!}
                />
              ) : (
                <FileUploadBlock
                  title={t('vehicleOwnershipUploadField.title')}
                  description={t('vehicleOwnershipUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('vehicleOwnership', data)}
                />
              )}

              {form.watch('driverLicense.url') ? (
                <FileUploadedBlock title={t('licenseUploadField.title')} description={t('licenseUploadField.description')} url={form.watch('driverLicense.url')!} />
              ) : (
                <FileUploadBlock
                  title={t('licenseUploadField.title')}
                  description={t('licenseUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('driverLicense', data)}
                />
              )}

              {form.watch('identificationCard.url') ? (
                <FileUploadedBlock title={t('idUploadField.title')} description={t('idUploadField.description')} url={form.watch('identificationCard.url')!} />
              ) : (
                <FileUploadBlock
                  title={t('idUploadField.title')}
                  description={t('idUploadField.description')}
                  onUploadFinished={(data) => handleFileUploaded('identificationCard', data)}
                />
              )}

              <div className="flex justify-center">
                <Button type="submit" size="lg" loading={isCreatingDocument} className="text-lg font-semibold">
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
