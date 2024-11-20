'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

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

  console.log(driver);

  const handleFileUploaded = (fileName: string, data: any) => {
    form.setValue(fileName as any, data?.url);
  };

  const handleSubmit = async (data: FormProps) => {
    console.log('here', data);
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
        <Headline title="INSURANCE INFORMATION" icon={FilesIcon} />
        <Separator />
      </div>

      {!isPending && (
        <div className="mt-8">
          <Form {...form}>
            <form className="space-y-4 w-full mx-auto md:w-[750px] grid grid-cols-1 md:grid-cols-2 gap-24" onSubmit={form.handleSubmit(handleSubmit)}>
              {form.watch('vehicleInsuranceUrl') ? (
                <FileUploadedBlock title="Driver and vehicle Insurance" description="For verification upload your vehicle insurance" url={form.watch('vehicleInsuranceUrl')!} />
              ) : (
                <FileUploadBlock
                  title="Driver and vehicle Insurance"
                  description="For verification upload your vehicle insurance"
                  onUploadFinished={(data) => handleFileUploaded('vehicleInsuranceUrl', data)}
                />
              )}

              {form.watch('vehicleOwnershipUrl') ? (
                <FileUploadedBlock
                  title="Vehicle Ownership (Mulkiya)"
                  description="For verification upload your vehicle ownership (mulkiya)"
                  url={form.watch('vehicleOwnershipUrl')!}
                />
              ) : (
                <FileUploadBlock
                  title="Vehicle Ownership (Mulkiya)"
                  description="For verification upload your vehicle ownership (mulkiya)"
                  onUploadFinished={(data) => handleFileUploaded('vehicleOwnershipUrl', data)}
                />
              )}

              {form.watch('driverLicenseUrl') ? (
                <FileUploadedBlock title="Driver License" description="For verification upload your driving license" url={form.watch('driverLicenseUrl')!} />
              ) : (
                <FileUploadBlock
                  title="Driver License"
                  description="For verification upload your driving license"
                  onUploadFinished={(data) => handleFileUploaded('driverLicenseUrl', data)}
                />
              )}

              {form.watch('identificationCardUrl') ? (
                <FileUploadedBlock title="Identification card" description="For verification upload your Resident identification card" url={form.watch('identificationCardUrl')!} />
              ) : (
                <FileUploadBlock
                  title="Identification card"
                  description="For verification upload your Resident identification card"
                  onUploadFinished={(data) => handleFileUploaded('identificationCardUrl', data)}
                />
              )}

              <div className="flex justify-center">
                <Button type="submit" size="lg" loading={isEditing} className="text-lg font-semibold">
                  SAVE
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
