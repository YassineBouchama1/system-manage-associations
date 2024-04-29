import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuthProvider";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { locales } from "../../config";
import { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { GlobalThemeProvider } from "@/hooks/useTheme";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/ReduxProvider";
import Favicon from "/public/logoMorocco.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouCode",
  description: "Association Managment",
  icons: [{ rel: "icon", url: Favicon.src }],
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

// export async function generateMetadata({
//   params: { locale },
// }: Omit<Props, "children">) {
//   const t = await getTranslations({ locale, namespace: "LocaleLayout" });

//   return {
//     title: t("title"),
//   };
// }


export default function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

const correntlocale = useLocale()

if(locale !== correntlocale){
  notFound()
}

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <GlobalThemeProvider>
                <ReduxProvider>
              {children}
                </ReduxProvider>
              <Toaster position="top-center" />
            </GlobalThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
