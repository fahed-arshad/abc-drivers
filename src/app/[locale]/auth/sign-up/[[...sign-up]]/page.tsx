'use client';

import { useState } from 'react';

import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { useRouter } from '@/i18n/routing';

import { useSignUp } from '@clerk/nextjs';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';

import { toast } from 'sonner';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navigator from '../../components/navigator';
import SignUpDisclaimer from '../../components/disclaimer';

const formSchema = z.object({
  email: z.string().email().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  password: z.string().min(8, 'Required')
});

type FormProps = z.infer<typeof formSchema>;

function SignUpPage() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      phone: '',
      password: ''
    }
  });

  // Handle submission of the sign-up form
  const handleSubmit = async (data: FormProps) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
        unsafeMetadata: {
          phone: data.phone
        }
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      });

      router.push('/auth/verify');
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        const error = err?.errors[0];
        const code = error?.code;
        const message = error?.message;
        if (code === 'form_identifier_exists') return toast.error(message ?? 'Email already exists');
        if (code === 'form_password_pwned') return toast.error(message ?? 'Password is too weak');
        return toast.error('An error occurred. Please try again later');
      } else return toast.error('An error occurred. Please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl space-y-10">
      <Navigator />
      <h2 className="text-2xl text-center text-white font-bold">Create your ABC Emergency Partner Account</h2>
      <Separator />

      <Form {...form}>
        <form className="space-y-4 w-full mx-auto md:w-[600px]" onSubmit={form.handleSubmit(handleSubmit)}>
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" {...field} />
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
            <Button type="submit" size="lg" loading={loading} className="text-lg font-semibold">
              JOIN US
            </Button>
          </div>
        </form>
      </Form>

      <SignUpDisclaimer />
    </div>
  );
}

export default SignUpPage;