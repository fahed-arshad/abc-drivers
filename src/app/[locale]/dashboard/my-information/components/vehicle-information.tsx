'use client';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { twMerge } from 'tailwind-merge';

import { toast } from 'sonner';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Autocomplete } from '@/components/ui/autocomplete';

import { useUser } from '@/hooks/useUser';
import useApi from '@/hooks/api/useApi';

import { getVehicleMakes, getVehicleModels } from '@/actions/vehicle';

import { vehicleColors, VehicleYears } from '../data/vehicle-data';

const formSchema = z.object({
  make: z.string().min(1, 'Required'),
  model: z.string().min(1, 'Required'),
  year: z.string().min(1, 'Required'),
  color: z.string().min(1, 'Required'),
  registrationNo: z.string().min(1, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

type DriverInformationProps = React.HTMLAttributes<HTMLDivElement>;

function VehicleInformation({ className }: DriverInformationProps) {
  const { user } = useUser();
  const { drivers } = useApi();

  const queryClient = useQueryClient();

  const { data: driver } = useQuery({
    queryKey: ['drivers', user?.id],
    queryFn: () => drivers.getDriver()
  });

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: '',
      model: '',
      year: '',
      color: '',
      registrationNo: ''
    },
    values: {
      make: driver?.vehicle?.make ?? '',
      model: driver?.vehicle?.model ?? '',
      year: driver?.vehicle?.year?.toString() ?? '',
      color: driver?.vehicle?.color ?? '',
      registrationNo: driver?.vehicle?.regNo ?? ''
    }
  });

  const { data: vehicleMakes, isLoading: isVehicleMakesLoading } = useQuery({
    queryKey: ['vehicles', 'makes', form.watch('make')],
    queryFn: () => getVehicleMakes(form.watch('make'))
  });

  const { data: vehicleModels, isLoading: isVehicleModelsLoading } = useQuery({
    queryKey: ['vehicles', 'models', form.watch('model')],
    queryFn: () => getVehicleModels(form.watch('model'))
  });

  const { mutateAsync: createDriverVehicleMutation, isPending: isCreating } = useMutation({
    mutationFn: drivers.createDriverVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver created successfully.');
    },
    onError: () => {
      toast.error('Failed to create driver.');
    }
  });

  const { mutateAsync: editDriverVehicleMutation, isPending: isEditing } = useMutation({
    mutationFn: drivers.editDriverVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers', user?.id] });
      toast.success('Driver updated successfully.');
    },
    onError: () => {
      toast.error('Failed to update driver.');
    }
  });

  const handleSubmit = async (data: FormProps) => {
    if (driver?.vehicle) {
      await editDriverVehicleMutation({
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        color: data.color,
        regNo: data.registrationNo
      });
    } else {
      await createDriverVehicleMutation({
        make: data.make,
        model: data.model,
        year: parseInt(data.year),
        color: data.color,
        regNo: data.registrationNo
      });
    }
  };

  return (
    <div className={twMerge('space-y-4', className)}>
      <h2 className="text-2xl">VEHICLE INFORMATION</h2>
      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Autocomplete
                    isLoading={isVehicleMakesLoading}
                    items={vehicleMakes?.map((make) => ({ label: make as string, value: make as string })) ?? []}
                    placeholder="Select vehicle make"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Autocomplete
                    isLoading={isVehicleModelsLoading}
                    items={vehicleModels?.map((model) => ({ label: model as string, value: model as string })) ?? []}
                    placeholder="Select vehicle model"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Autocomplete
                    items={VehicleYears?.filter((year) => year.includes(field.value))?.map((year) => ({ label: year, value: year })) ?? []}
                    placeholder="Select vehicle year"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Autocomplete
                    items={vehicleColors?.filter((color) => color.includes(field.value))?.map((color) => ({ label: color, value: color })) ?? []}
                    placeholder="Select vehicle color"
                    searchValue={field.value}
                    onSearchValueChange={field.onChange}
                    selectedValue={field.value}
                    onSelectedValueChange={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" size="lg" loading={isCreating || isEditing} className="text-lg font-semibold">
              SAVE
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default VehicleInformation;
