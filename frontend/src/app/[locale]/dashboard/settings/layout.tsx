import SectionWrapper from "@/components/Wrappers/SectionWrapper";

export default async function SettingsLayout({
  children,
  PasswordForm,
}: Readonly<{
  children: React.ReactNode;
  PasswordForm: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-3 gap-4 min-h-full">
      <SectionWrapper styles="col-span-3 lg:col-span-1 md:px-4 max-h-[500px]">
        {PasswordForm}
      </SectionWrapper>
      <SectionWrapper styles="col-span-3 lg:col-span-2 py-2">
        {children}
      </SectionWrapper>
    </main>
  );
}
