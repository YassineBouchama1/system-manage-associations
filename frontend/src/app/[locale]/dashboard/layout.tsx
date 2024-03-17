import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
import { getSession } from "@/lib/getSessions";

export default  function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      
      <Sidebar  />
   
        <div className="flex flex-col w-full h-full  p-4">
          <Header />
          {children}
        </div>
    
    </div>
  );
}
