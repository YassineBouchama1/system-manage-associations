import LocaleSwitcher from "@/components/LocaleSwitcher";
import LoginForm from "@/components/auth/login-form";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";



export async function generateMetadata() {
  const t = await getTranslations("login");

  return {
    title: t("title"),
  };
}

export default function Page() {
  const t =  useTranslations("login");

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <LocaleSwitcher />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          {t("title")}
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("title_form")}
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
