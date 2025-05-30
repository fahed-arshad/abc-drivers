import Header from './components/header';

async function AuthLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <div className="relative h-screen overflow-hidden">
      <Header locale={locale} className="fixed z-[999] top-0 left-0 right-0" />
      <main className="absolute top-28 left-0 right-0 bg-[#000D16] h-[calc(100vh-7rem)] flex flex-col items-center justify-center">{children}</main>
    </div>
  );
}

export default AuthLayout;
