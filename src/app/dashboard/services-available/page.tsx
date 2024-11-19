'use client';

import z from 'zod';

import { useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import Headline from '../components/headline';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

import { useUser } from '@/hooks/useUser';
import useApi from '@/hooks/api/useApi';

import { BanknoteIcon } from 'lucide-react';

const formSchema = z.object({
  services: z.array(z.string())
});

type FormProps = z.infer<typeof formSchema>;

function ServicesAvailablePage() {
  const { user } = useUser();
  const { drivers } = useApi();

  const queryClient = useQueryClient();

  const { data: driver, isPending } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const { mutateAsync: editDriverServicesMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver services updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update driver services.');
    }
  });

  const form = useForm<FormProps>({
    defaultValues: {
      services: []
    },
    values: { services: driver?.services }
  });

  const isChecked = (value: string) => {
    const services = form.watch('services') as string[];
    return services?.includes(value);
  };

  const handleCheckedChange = (value: string, checked: boolean) => {
    const services = form.getValues('services') as string[];

    // Make sure to remove duplicates
    if (checked && services?.includes(value)) return;

    const newServices = checked ? [...services, value] : services.filter((service) => service !== value);

    form.setValue('services', newServices);
  };

  const handleSubmit = async (data: FormProps) => {
    await editDriverServicesMutation({
      services: data.services
    });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title="ROADSIDE SERVICES" icon={BanknoteIcon} />
        <Separator />
      </div>

      <div className="mt-8">
        <Form {...form}>
          <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
            {SupportedServices.map((service) => (
              <FormField
                key={service.value}
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox id={service.value} checked={isChecked(service.value)} onCheckedChange={(checked) => handleCheckedChange(service.value, checked as boolean)} />
                        <label htmlFor={service.value} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {service.label}
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <div className="flex justify-center">
              <Button type="submit" size="lg" loading={isEditing} className="text-lg font-semibold">
                SAVE
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ServicesAvailablePage;

const SupportedServices = [
  {
    value: 'BATTERY_INSTALLATION',
    label: 'Battery Installation'
  },
  {
    value: 'BATTERY_TEST',
    label: 'Battery Test'
  },
  {
    value: 'FUEL_DELIVERY',
    label: 'Fuel Delivery'
  },
  {
    value: 'JUMP_START',
    label: 'Jump Start'
  },
  {
    value: 'TIRE_CHANGE',
    label: 'Tire Change'
  },
  {
    value: 'LOCKOUT',
    label: 'Lockout'
  },
  {
    value: 'LIGHT_DUTY_TOW',
    label: 'Light Duty Tow'
  },
  {
    value: 'MEDIUM_DUTY_TOW',
    label: 'Medium Duty Tow'
  },
  {
    value: 'HEAVY_DUTY_TOW',
    label: 'Heavy Duty Tow'
  },
  {
    value: 'MOTORCYCLE_TOW',
    label: 'Motorcycle Tow'
  }
];
