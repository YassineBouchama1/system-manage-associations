
export default async function TransactionLayout({
  children,
 
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <div className="flex flex-col gap-8">
      <div> {children}</div>
 
    </div>
  );
}
