"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useSignUp } from "@clerk/nextjs";

import axios from "@/lib/axios";

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

const formSchema = z.object({
  code: z.string().min(1, "Required"),
});

type FormProps = z.infer<typeof formSchema>;

function VerificationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleVerify = async (data: FormProps) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        // Create a new user in the DB
        await axios.post("/auth/signup-via-clerk", {
          email: signUpAttempt.emailAddress,
          phone: signUpAttempt.unsafeMetadata.phone,
          externalId: signUpAttempt.createdUserId,
        });

        await setActive({ session: signUpAttempt.createdSessionId });

        router.push("/dashboard");
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));

      if (err?.status === 409) {
        toast.error("User already exists. Please login.");
        router.push("/auth/sign-in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl space-y-10">
      <h2 className="text-2xl text-center text-white font-bold">
        VERIFY YOUR EMAIL
      </h2>
      <Separator />

      <Form {...form}>
        <form
          className="space-y-4 w-full mx-auto md:w-[600px]"
          onSubmit={form.handleSubmit(handleVerify)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Enter your verification code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Verification code" {...field} />
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
              VERIFY
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default VerificationPage;
