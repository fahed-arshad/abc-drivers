'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Headline from '../components/headline';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileUploadBlock from '../components/file-upload-block';
import FileUploadedBlock from '../components/file-uploaded-block';

import { useUser } from '@/hooks/useUser';
import useApi from '@/hooks/api/useApi';

import { BriefcaseBusinessIcon } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  governate: z.string().min(1, 'Required'),
  crNo: z.string().min(1, 'Required'),
  crUrl: z.string().url().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

function BusinessInformationPage() {
  const { user } = useUser();
  const { drivers } = useApi();
  const t = useTranslations('dashboard.businessInformationPage');

  const queryClient = useQueryClient();

  const { data: driver } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const { mutateAsync: createDriverBusinessMutation, isPending: isCreating } = useMutation({
    mutationFn: drivers.createDriverBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Business details saved successfully.');
    },
    onError: () => {
      toast.error('Failed to save business details.');
    }
  });

  const { mutateAsync: editDriverBusinessMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriverBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Business details updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update business details.');
    }
  });

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      address2: '',
      city: '',
      governate: Governates[0],
      crNo: '',
      crUrl: ''
    },
    values: {
      name: driver?.business?.name ?? '',
      address: driver?.business?.address?.line1 ?? '',
      address2: driver?.business?.address?.line2 ?? '',
      city: driver?.business?.address?.city ?? '',
      governate: driver?.business?.address?.governate ?? Governates[0],
      crNo: driver?.business?.crNo ?? '',
      crUrl: driver?.business?.crUrl ?? ''
    }
  });

  const handleFileUploaded = (data: any) => {
    form.setValue('crUrl', data.url);
  };

  const handleSubmit = async (data: FormProps) => {
    if (driver?.business) {
      await editDriverBusinessMutation({
        name: data.name,
        address: {
          line1: data.address,
          line2: data.address2,
          city: data.city,
          governate: data.governate
        },
        crNo: data.crNo,
        crUrl: data.crUrl
      });
    } else {
      await createDriverBusinessMutation({
        name: data.name,
        address: {
          line1: data.address,
          line2: data.address2,
          city: data.city,
          governate: data.governate
        },
        crNo: data.crNo,
        crUrl: data.crUrl
      });
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title={t('title')} icon={BriefcaseBusinessIcon} />
        <Separator />
      </div>

      <div className="mt-8">
        <Form {...form}>
          <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('businessNameField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('businessAddressField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('businessAddress2Field.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cityField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="governate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('governateField.title')}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select governate" />
                      </SelectTrigger>
                      <SelectContent>
                        {Governates.map((governate) => (
                          <SelectItem key={governate} value={governate}>
                            {t(`governates.${governate}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="crNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('crNoField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('crUrl') ? (
              <FileUploadedBlock title={t('crUploadField.title')} description={t('crUploadField.description')} url={form.watch('crUrl')!} />
            ) : (
              <FileUploadBlock title={t('crUploadField.title')} description={t('crUploadField.description')} onUploadFinished={handleFileUploaded} />
            )}

            <div className="flex justify-center">
              <Button type="submit" size="lg" loading={isCreating || isEditing} className="text-lg font-semibold">
                {t('cta')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default BusinessInformationPage;

const Governates = [
  'Muscat',
  'Dhofar',
  'Musandam',
  'Al Wusta',
  'Al Buraimi',
  'Ad Dhahirah',
  'Ad Dakhiliyah',
  'Al Batinah North (Al Batinah North Governorate)',
  'Al Batinah South (Al Batinah South Governorate)',
  'Ash Sharqiyah North (Ash Sharqiyah North Governorate)',
  'Ash Sharqiyah South (Ash Sharqiyah South Governorate)'
];
