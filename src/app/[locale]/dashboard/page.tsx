'use server';

import { redirect } from 'next/navigation';

export default async function Home({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  redirect(`/${locale}/dashboard/my-information`);
}
