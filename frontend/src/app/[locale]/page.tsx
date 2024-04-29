import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";
import { getSession } from "@/lib/getSessions";
import { getTranslations } from "next-intl/server";
import {  useLocale } from "next-intl";

import Image from "next/image";
import Link from "next/link";
import { FlagIcon } from "lucide-react";


const DashboardPage = async () => {
    const t = await getTranslations("ui");
const session = await getSession()


const correntlocale = useLocale();
    //
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="bg-[#f8f9ff] font-[sans-serif] text-[#333] text-[15px]">
        <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] shadow-md shadow-b">
          <div className="relative flex  justify-between items-center gap-4">
            <a>
              <Image
                src={correntlocale === "ar" ? "/moroccoAr.png" : "/morocco.png"}
                alt="logo"
                sizes="20"
                width="20"
                height="20"
                className="h-16 w-auto"
              />
            </a>
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
        <div className="relative bg-repeat">
          <div className="px-4 sm:px-10 ">
            <div className="relative mt-16 max-w-4xl mx-auto text-center relative z-10">
              <h1
                className={`  md:text-6xl text-4xl font-bold mb-6 md:!leading-[75px]`}
              >
                {t("home_page_main_text")}
              </h1>
              <Image
                src="/bgContent1.png"
                className="absolute right-0 bottom-0  w-auto h-auto bg-repeat"
                alt="logo"
                width="200"
                height="200"
              />
              <Image
                src="/bgContent1.png"
                className="absolute rotate-180 left-0 top-0 w-auto h-auto bg-repeat"
                alt="logo"
                width="200"
                height="200"
              />
              <p className="text-xl">{t("home_page_paraghraph_text")}</p>
            </div>

            <Image
              src="/bgContent1.png"
              className="absolute hidden md:block  right-0 top-0 w-auto h-auto bg-repeat"
              alt="logo"
              width="200"
              height="200"
            />

            <Image
              src="/bgContent1.png"
              className="absolute hidden md:block  left-0 top-0  w-auto h-auto bg-repeat"
              alt="logo"
              width="200"
              height="200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
