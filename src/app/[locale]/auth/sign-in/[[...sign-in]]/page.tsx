"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

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
import { Separator } from "@/components/ui/separator";
import Navigator from "../../components/navigator";

const formSchema = z.object({
  email: z.string().email().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

function SignInPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle the submission of the sign-in form
  const handleSubmit = async (data: FormProps) => {
    if (!isLoaded) {
      return;
    }

    setLoading(true);
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        const error = err?.errors[0];
        const code = error?.code;
        const message = error?.message;
        console.log(error);
        if (code === "form_password_incorrect")
          return toast.error(message ?? "Incorrect password");
        return toast.error("An error occurred. Please try again later");
      } else return toast.error("An error occurred. Please try again later");
    } finally {
      setLoading(false);
    }
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
          onSubmit={form.handleSubmit(handleSubmit)}
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
            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="text-lg font-semibold"
            >
              LOG IN
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignInPage;
