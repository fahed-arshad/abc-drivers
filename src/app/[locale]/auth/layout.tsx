import Header from './components/header';

function AuthLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className="relative bg-red-300 h-full">
      <Header locale={locale} className="absolute top-0 left-0 right-0" />
      <main className="absolute top-28 left-0 right-0 bg-[#000D16] h-[calc(100vh-7rem)] flex flex-col items-center justify-center">{children}</main>
    </div>
  );
}

export default AuthLayout;
