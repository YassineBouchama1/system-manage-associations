'use client'
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
    const t = useTranslations("Index");

  return (
    <div>
      <LocaleSwitcher/>
      Dashboard Page<h1>{t("title")}</h1>
    </div>
  );
};

export default DashboardPage;
