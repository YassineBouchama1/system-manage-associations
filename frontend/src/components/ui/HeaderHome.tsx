import Image from "next/image";
import type { FC } from "react";
import LocaleSwitcher from "../next-intl/LocaleSwitcher";
import Link from "next/link";
import { getSession } from "@/lib/getSessions";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

interface HeaderHomeProps {}

const HeaderHome: FC<HeaderHomeProps> = async ({}) => {
    const t = await getTranslations("ui");
  const session = await getSession();

  const correntlocale = useLocale();
  return (
    <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] shadow-md shadow-b">
      <div className="relative flex  justify-between items-center gap-4 flex-wrap">
        <Link
        href={'/'}
        >
          <Image
            src={correntlocale === "ar" ? "/moroccoAr.png" : "/morocco.png"}
            alt="logo"
            sizes="20"
            width="20"
            height="20"
            className="h-16 w-auto"
          />
        </Link>
        <div>
          <LocaleSwitcher />
        </div>
        <div className="flex ">
          {session?.token ? (
            <Link
              href={"/dashboard"}
              className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
            >
              {t("dashboard")}
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
            >
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default HeaderHome;
