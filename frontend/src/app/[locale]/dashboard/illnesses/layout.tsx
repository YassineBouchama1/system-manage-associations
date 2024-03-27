
export default async function TransactionLayout({
  children,
  table,
}: Readonly<{
  children: React.ReactNode;
  table: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8">
      <div> {children}</div>
      <div> {table}</div>
    </div>
  );
} 
