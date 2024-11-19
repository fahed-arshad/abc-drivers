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
import FileUploadBlock from "../components/file-upload-block";

import { BriefcaseBusinessIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  address2: z.string().optional(),
  city: z.string().min(1, "Required"),
  governate: z.string().min(1, "Required"),
  crNo: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

function BusinessInformationPage() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      address2: "",
      city: "",
      governate: Governates[0],
      crNo: "",
    },
  });

  const handleSubmit = async (data: FormProps) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <Headline title="BUSINESS INFORMATION" icon={BriefcaseBusinessIcon} />
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
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
                  <FormLabel>Business Address</FormLabel>
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
                  <FormLabel>Business Address 2 (Optional)</FormLabel>
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
                  <FormLabel>City</FormLabel>
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
                  <FormLabel>Governate</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("governate", value)
                      }
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {Governates.map((governate) => (
                          <SelectItem key={governate} value={governate}>
                            {governate}
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
                  <FormLabel>CR Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FileUploadBlock
              title="Upload CR"
              description="For verification upload your CR"
              onUploadFinished={(data) => {}}
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

export default BusinessInformationPage;

const Governates = [
  "Muscat",
  "Dhofar",
  "Musandam",
  "Al Buraimi",
  "Ad Dakhiliyah",
  "Al Batinah North (Al Batinah North Governorate)",
  "Al Batinah South (Al Batinah South Governorate)",
  "Ash Sharqiyah North (Ash Sharqiyah North Governorate)",
  "Ash Sharqiyah South (Ash Sharqiyah South Governorate)",
  "Ad Dhahirah",
  "Al Wusta",
];
