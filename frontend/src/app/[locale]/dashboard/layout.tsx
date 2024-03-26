import Header from "@/components/header/Header";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import PageWrapper from "@/components/page-wrapper";
import Sidebar from "@/components/sidebar";
import TitlePage from "@/components/ui/TitlePage";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <PageWrapper>
          <TitlePage title="Dashboard"/>
          {children}
          </PageWrapper>
      </main>
    </div>
  );
}
