import Header from "@/components/header/Header";
import MarginWidthWrapper from "@/components/Wrappers/margin-width-wrapper";
import Sidebar from "@/components/sidebar";
import TitlePage from "@/components/ui/TitlePage";
import PageWrapper from "@/components/Wrappers/page-wrapper";
import MotionWrapper from "@/components/MotionWrapper";

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
          <TitlePage />
           <MotionWrapper>
          {children}
           </MotionWrapper>
          </PageWrapper>
      </main>
    </div>
  );
}
