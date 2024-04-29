import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";
import { getSession } from "@/lib/getSessions";
import { getTranslations } from "next-intl/server";
import {  useLocale } from "next-intl";

import Image from "next/image";
import Link from "next/link";


const DashboardPage = async () => {
    const t = await getTranslations("Index");
const session = await getSession()


const correntlocale = useLocale();
    // <LocaleSwitcher />
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="bg-[#f8f9ff] font-[sans-serif] text-[#333] text-[15px]">
        <header className="py-4 px-4 sm:px-10 z-50 min-h-[70px] shadow-md shadow-b">
          <div className="relative flex flex-wrap items-center gap-4">
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

            <div className="flex ml-auto">
              {session?.token ? (
                <Link
                  href={"/dashboard"}
                  className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </header>
        <div className="relative ">
          <div className="px-4 sm:px-10 ">
            <div className="mt-16 max-w-4xl mx-auto text-center relative z-10">
              <h1 className="md:text-6xl text-4xl font-extrabold mb-6 md:!leading-[75px]">
                Build Landing Pages with Typeform Integration
              </h1>
              <p className="text-base">
                Embark on a gastronomic journey with our curated dishes,
                delivered promptly to your doorstep. Elevate your dining
                experience today. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </p>
              {/* <div className="mt-10">
                <button className="px-6 py-3 rounded-xl text-white bg-theme-color transition-all hover:opacity-85 duration-150">
                  Get started today
                </button>
              </div> */}
            </div>
            {/* <hr className="my-12 border-gray-300" /> */}

            <Image
              src="/bgContent1.png"
              className="absolute right-0 top-0 w-auto h-auto bg-repeat"
              alt="logo"
              width="20"
              height="20"
            />
            <Image
              src="/bgContent1.png"
              className="absolute inset-0 w-auto h-auto bg-repeat"
              alt="logo"
              width="20"
              height="20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
