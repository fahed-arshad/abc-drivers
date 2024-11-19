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

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  driverEmail: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

type DriverInformationProps = React.HTMLAttributes<HTMLDivElement>;

function DriverInformation({ className }: DriverInformationProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      driverEmail: "",
    },
  });

  const handleSubmit = async (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className={twMerge("space-y-4", className)}>
      <h2 className="text-2xl">DRIVER INFORMATION</h2>
      <Form {...form}>
        <form
          className="space-y-4 w-full mx-auto md:w-[600px]"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
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
                <FormLabel>Last Name</FormLabel>
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
                <FormLabel>Phone Number</FormLabel>
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
                <FormLabel>Driver Email</FormLabel>
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

export default DriverInformation;
