import Header from "@/components/header/Header";
import MarginWidthWrapper from "@/components/Wrappers/margin-width-wrapper";
import Sidebar from "@/components/sidebar";
import TitlePage from "@/components/ui/TitlePage";
import PageWrapper from "@/components/Wrappers/page-wrapper";
import MotionWrapper from "@/components/MotionWrapper";
import { Toaster } from "react-hot-toast";
import { getSession } from "@/lib/getSessions";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session  = await getSession()
  return (
    <div className=" md:flex  h-full w-full bg-gray-100">
      <Sidebar session={session} />
      <main className="flex-1">
        <Header session={session} />
        <PageWrapper>
          <TitlePage />
          <MotionWrapper>{children}</MotionWrapper>
        </PageWrapper>
      </main>
    </div>
  );
}
