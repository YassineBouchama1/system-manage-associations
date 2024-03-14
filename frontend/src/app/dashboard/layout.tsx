import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar />
      <div className="flex flex-col w-full h-full ml-64 p-4">{children}</div>
    </div>
  );
}
