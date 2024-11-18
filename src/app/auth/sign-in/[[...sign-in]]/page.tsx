"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

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
import { Separator } from "@/components/ui/separator";
import Navigator from "../../components/navigator";

const formSchema = z.object({
  email: z.string().email().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

function SignInPage() {
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: FormProps) => {
    console.log(values);
  };

  return (
    <div className="container max-w-3xl space-y-10">
      <Navigator />
      <h2 className="text-2xl text-center text-white font-bold">
        Login to your ABC Emergency Partner Account
      </h2>
      <Separator />

      <Form {...form}>
        <form
          className="space-y-4 w-full mx-auto md:w-[600px]"
          onSubmit={form.handleSubmit(handleOnSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" size="lg" className="text-lg font-semibold">
              LOG IN
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignInPage;
