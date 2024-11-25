'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { twMerge } from 'tailwind-merge';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import useApi from '@/hooks/api/useApi';
import { useUser } from '@/hooks/useUser';

const formSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().optional(),
  phone: z.string().min(1, 'Required'),
  driverEmail: z.string().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

type DriverInformationProps = React.HTMLAttributes<HTMLDivElement>;

function DriverInformation({ className }: DriverInformationProps) {
  const { user } = useUser();
  const { drivers } = useApi();
  const t = useTranslations('dashboard.myInformationPage.driverInformationSection');

  const queryClient = useQueryClient();

  const { data: driver } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const { mutateAsync: createDriverMutation, isPending: isCreating } = useMutation({
    mutationFn: drivers.createDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver created successfully.');
    },
    onError: () => {
      toast.error('Failed to create driver.');
    }
  });

  const { mutateAsync: editDriverMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update driver.');
    }
  });

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      driverEmail: ''
    },
    values: {
      firstName: driver?.firstName ?? '',
      lastName: driver?.lastName ?? '',
      phone: driver?.phone,
      driverEmail: driver?.email
    }
  });

  const handleSubmit = async (data: FormProps) => {
    if (driver?.id) {
      await editDriverMutation({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.driverEmail,
        phone: data.phone
      });
    } else {
      await createDriverMutation({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.driverEmail,
        phone: data.phone
      });
    }
  };

  return (
    <div className={twMerge('space-y-4', className)}>
      <h2 className="text-2xl">{t('title')}</h2>
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('firstNameField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('lastNameField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('phoneField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('emailField.title')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" size="lg" loading={isCreating || isEditing} className="text-lg font-semibold">
              {t('cta')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DriverInformation;
