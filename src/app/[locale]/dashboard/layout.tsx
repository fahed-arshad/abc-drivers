import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

async function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <div className="relative h-screen">
      <Header locale={locale} className="fixed z-[999] top-0 left-0 right-0" />
      <div className="sm:container flex flex-row absolute top-28 left-0 right-0 overflow-hidden h-[calc(100vh-10.5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Footer className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}

export default DashboardLayout;
