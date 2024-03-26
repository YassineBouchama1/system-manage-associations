
export default async function TransactionLayout({
  children,
  cities,
}: Readonly<{
  children: React.ReactNode;
  cities: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-8">
      <div> {children}</div>
      <div>{cities}</div>
    </div>
  );
}
