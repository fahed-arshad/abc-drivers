"use client";

import { useState } from "react";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import Headline from "../components/headline";
import { Separator } from "@/components/ui/separator";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CircleDollarSignIcon } from "lucide-react";

const formSchema = z.object({
  accountNo: z.string().min(1, "Required"),
  bankName: z.string().min(1, "Required"),
  iban: z.string().min(1, "Required"),
  accountOwnerName: z.string().min(1, "Required"),
  linkedPhoneNo: z.string().min(1, "Required"),
  method: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountNo: "",
      bankName: "",
      iban: "",
      accountOwnerName: "",
      linkedPhoneNo: "",
      method: SupportedMethods[0].value,
    },
  });

  const handleSubmit = async (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title="PAYMENT" icon={CircleDollarSignIcon} />
        <Separator />
      </div>

      <div className="mt-8">
        <Form {...form}>
          <form
            className="space-y-4 w-full mx-auto md:w-[600px]"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="accountNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
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
                  <FormLabel>Bank Name</FormLabel>
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
                  <FormLabel>IBAN</FormLabel>
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
                  <FormLabel>Name on Bank Account</FormLabel>
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
                  <FormLabel>Phone Number Linked to Bank</FormLabel>
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
                  <FormLabel>Preferred method(Bank OR mobile)</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => form.setValue("method", value)}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {SupportedMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
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
    </div>
  );
}

export default PaymentPage;

const SupportedMethods = [
  {
    value: "BANK_TRANSFER",
    label: "Bank Transfer",
  },
  {
    value: "MOBILE_PAYMENT",
    label: "Mobile Payment",
  },
];
