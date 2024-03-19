import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/lib/getSessions";

export default  function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full bg-gray-100">
      <Sidebar />

      <div className="flex flex-col w-full h-full  ">
        <Header />
        <div className="bg-[#F5F6FA] flex flex-col w-full h-full  p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
