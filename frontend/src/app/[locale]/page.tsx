'use client'
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";
import NavigationLink from "@/components/next-intl/NavigationLink";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
    const t = useTranslations("Index");

  return (
    <div>
      <LocaleSwitcher />
      Dashboard Page<h1>{t("title")}</h1>
      <NavigationLink href="/login">login</NavigationLink>
    </div>
  );
};

export default DashboardPage;
