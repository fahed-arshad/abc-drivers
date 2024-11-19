"use client";

import { useState } from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { twMerge } from "tailwind-merge";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Autocomplete } from "@/components/ui/autocomplete";

import { vehicleColors, VehicleYears } from "../data/vehicle-data";

const formSchema = z.object({
  make: z.string().min(1, "Required"),
  model: z.string().min(1, "Required"),
  year: z.string().min(1, "Required"),
  color: z.string().min(1, "Required"),
  registrationNo: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

type DriverInformationProps = React.HTMLAttributes<HTMLDivElement>;

function VehicleInformation({ className }: DriverInformationProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      registrationNo: "",
    },
  });

  const handleSubmit = async (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className={twMerge("space-y-4", className)}>
      <h2 className="text-2xl">VEHICLE INFORMATION</h2>
      <Form {...form}>
        <form
          className="space-y-4 w-full mx-auto md:w-[600px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                    items={
                      VehicleYears?.filter((year) =>
                        year.includes(field.value)
                      )?.map((year) => ({ label: year, value: year })) ?? []
                    }
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
                    items={
                      vehicleColors
                        ?.filter((color) => color.includes(field.value))
                        ?.map((color) => ({ label: color, value: color })) ?? []
                    }
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
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="text-lg font-semibold"
            >
              SAVE
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default VehicleInformation;
