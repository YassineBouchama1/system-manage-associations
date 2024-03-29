import SectionWrapper from "@/components/Wrappers/SectionWrapper";

export default  function TransactionLayout({
  children,
  table,
}: Readonly<{
  children: React.ReactNode;
  table: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-3 gap-4 min-h-full">
      <SectionWrapper styles="col-span-3 lg:col-span-1 md:px-20">
        {children}
      </SectionWrapper>
      <SectionWrapper styles="col-span-3 lg:col-span-2">{table}</SectionWrapper>
    </main>
  );
} 
