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
import { PayoutsTable } from './components/payouts-table';
import { columns } from './components/columns';
import { Skeleton } from '@/components/ui/skeleton';

import { useUser } from '@/hooks/useUser';
import useApi from '@/hooks/api/useApi';

import { cn } from '@/lib/utils';

import { CircleDollarSignIcon } from 'lucide-react';

const formSchema = z.object({
  accountNo: z.string().min(1, 'Required'),
  bankName: z.string().min(1, 'Required'),
  iban: z.string().min(1, 'Required'),
  accountOwnerName: z.string().min(1, 'Required'),
  linkedPhoneNo: z.string().min(1, 'Required'),
  method: z.string().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

function PaymentPage() {
  const { user } = useUser();
  const { drivers } = useApi();
  const t = useTranslations('dashboard.paymentPage');

  const queryClient = useQueryClient();

  const { data: driver } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const { mutateAsync: createDriverMutation, isPending: isCreating } = useMutation({
    mutationFn: drivers.createDriverBankAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Bank account details saved successfully.');
    },
    onError: () => {
      toast.error('Failed to update bank account details.');
    }
  });

  const { mutateAsync: editDriverMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriverBankAccount,
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
      accountNo: '',
      bankName: '',
      iban: '',
      accountOwnerName: '',
      linkedPhoneNo: '',
      method: SupportedMethods[0].value
    },
    values: {
      accountNo: driver?.bankAccount?.accNo ?? '',
      bankName: driver?.bankAccount?.bankName ?? '',
      iban: driver?.bankAccount?.iban ?? '',
      accountOwnerName: driver?.bankAccount?.holderName ?? '',
      linkedPhoneNo: driver?.bankAccount?.linkedPhone ?? '',
      method: driver?.bankAccount?.preferredMethod
    }
  });

  const handleSubmit = async (data: FormProps) => {
    if (driver?.bankAccount) {
      await editDriverMutation({
        bankName: data.bankName,
        holderName: data.accountOwnerName,
        iban: data.iban,
        accNo: data.accountNo,
        linkedPhone: data.linkedPhoneNo,
        preferredMethod: data.method
      });
    } else {
      await createDriverMutation({
        bankName: data.bankName,
        holderName: data.accountOwnerName,
        iban: data.iban,
        accNo: data.accountNo,
        linkedPhone: data.linkedPhoneNo,
        preferredMethod: data.method
      });
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title={t('title')} icon={CircleDollarSignIcon} />
        <Separator />
      </div>

      <div className="mt-8">
        <Form {...form}>
          <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="accountNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('accountNumberField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('bankNameField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iban"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('ibanField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountOwnerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameOnBankAccountField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedPhoneNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('linkedPhoneField.title')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('methodField.title')}</FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {SupportedMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {t(`methods.${method.value}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

      <PayoutDetails className="mt-8" />
    </div>
  );
}

export default PaymentPage;

const SupportedMethods = [
  {
    value: 'BANK_TRANSFER',
    label: 'Bank Transfer'
  },
  {
    value: 'MOBILE_PAYMENT',
    label: 'Mobile Payment'
  }
];

type PayoutDetailsProps = React.HTMLAttributes<HTMLDivElement>;

function PayoutDetails({ className }: PayoutDetailsProps) {
  const { user } = useUser();
  const { payouts } = useApi();
  const queryClient = useQueryClient();
  const t = useTranslations('dashboard.paymentPage');

  const { data: dueAmountData, isFetching } = useQuery({
    queryKey: ['payouts', 'due-amount', user?.id],
    queryFn: () => payouts.getDueAmount()
  });

  const { data: allPayoutsData } = useQuery({
    queryKey: ['payouts', user?.id],
    queryFn: () => payouts.getAllPayouts()
  });

  const { mutateAsync: requestPayoutMutation, isPending } = useMutation({
    mutationFn: payouts.requestPayout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payouts', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['payouts', 'due-amount', user?.id] });
      toast.success('Payout request sent successfully.');
    },
    onError: () => {
      toast.error('Failed to send the payout request. Please try again later.');
    }
  });

  const handleRequestPayout = () => {
    requestPayoutMutation();
  };

  return (
    <div className={cn(className)}>
      <div>
        <h2 className="font-semibold">{t('funds.title')}</h2>
        <div className="border py-6 px-4 space-y-2 mt-4 w-full md:w-[400px]">
          <p className="text-sm text-gray-600 font-semibold">{t('funds.card.title')}</p>
          {isFetching ? <Skeleton className="h-[20px] w-[150px]" /> : <h1 className="text-2xl font-semibold">OMR {dueAmountData?.dueAmount}</h1>}
          <Button disabled={dueAmountData?.dueAmount === 0 || isFetching} onClick={handleRequestPayout} loading={isPending}>
            {t('funds.card.cta')}
          </Button>
        </div>
      </div>

      <h2 className="font-semibold mt-4">{t('payouts.title')}</h2>
      <PayoutsTable columns={columns} data={allPayoutsData ?? []} searchKey="id" />
    </div>
  );
}
