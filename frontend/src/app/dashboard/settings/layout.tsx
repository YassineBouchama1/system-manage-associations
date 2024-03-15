import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
  home,
}: Readonly<{
  children: React.ReactNode;
  home: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <div> {home}</div>
    </div>
  );
}
