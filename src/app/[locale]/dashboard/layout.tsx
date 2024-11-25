import Header from './components/header';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

function DashboardLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div className="relative h-screen">
      <Header locale={locale} className="absolute top-0 left-0 right-0" />
      <div className="container flex flex-row absolute top-28 left-0 right-0 overflow-hidden h-[calc(100vh-10.5rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Footer className="absolute bottom-0 left-0 right-0" />
    </div>
  );
}

export default DashboardLayout;
