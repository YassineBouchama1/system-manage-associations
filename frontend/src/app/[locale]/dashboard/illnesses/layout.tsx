import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import { getSession } from "@/lib/getSessions";
import { redirect } from "next/navigation";

export default async  function TransactionLayout({
  children,
  table,
}: Readonly<{
  children: React.ReactNode;
  table: React.ReactNode;
}>) {


      const session = await getSession();

      if (session.role === 2) {
        redirect("/dashboard");
      }
  return (
    <main className="grid grid-cols-3 gap-4 min-h-full">
      <SectionWrapper styles="col-span-3 lg:col-span-1 md:px-4 max-h-[200px]">
        {children}
      </SectionWrapper>
      <SectionWrapper styles="col-span-3 lg:col-span-2 py-2">
        {table}
      </SectionWrapper>
    </main>
  );
} 
