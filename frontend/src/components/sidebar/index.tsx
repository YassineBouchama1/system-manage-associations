"use client";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
  LogOut,
  AlignJustify,
  X,
  Building2,
} from "lucide-react";
import SidebarItem from "./item";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/getSessions";
import { useAuthContext } from "@/hooks/useAuthProvider";
import { logout } from "@/actions/profile";
import { SubmitButton } from "../ui/SubmitButton";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "../next-intl/LocaleSwitcher";
import { useGlobalTheme } from "@/hooks/useTheme";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  role?: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
  role?: string;
}

const Sidebar = () => {
  const t = useTranslations("sideBar");
  const items: ISidebarItem[] = [
    {
      name: t("dashboard"),
      path: "/dashboard",
      icon: LayoutDashboard,
      role: "admin",
    },
    {
      name: t("associations"),
      path: "/dashboard/associations",
      icon: Building2,
      role: "admin",
    },
    {
      name: t("settings"),
      path: "/dashboard/settings",
      icon: Settings,
      role: "admin",

      items: [
        {
          name: "General",
          path: "/dashboard/settings",
          role: "admin",
        },
        {
          name: "Security",
          path: "/dashboard/settings/security",
        },
        {
          name: "Notifications",
          path: "/dashboard/settings/notifications",
        },
      ],
    },
  ];
  const [name, setName] = useState<string | undefined>("");
  const { session, setSession, loading } = useAuthContext();
  const { toggleSIdeBar, setToggleSIdeBar } = useGlobalTheme();

  //bring session
  useEffect(() => {
    const fetchSessions = async () => {
      const session = await getSession();
      console.log(session);
      setName(session?.name);
    };
    fetchSessions();
  }, []);

  const location = useLocale();

  const variants = {
    open: {
      opacity: 1,
      transition: { duration: 0.3 }, // Customize animation duration as needed
    },
    closed: {
      opacity: 1,
      transition: { duration: 0.3 }, // Customize animation duration as needed
    },
  };

  return (
    <motion.div
      initial={false}
      animate={toggleSIdeBar ? "open" : "closed"}
      variants={variants}
      className={`
      ${!toggleSIdeBar && "hidden"} ${
        location == "ar" ? "right-0" : "left-0"
      } md:flex  min-h-screen fixed top-0 bottom-0   md:static  w-64 bg-white shadow-lg z-10 p-4`}
    >
      <div className="   flex flex-col space-y-10 w-full  h-full">
        <div className="flex gap-1">
          <button
            className="md:hidden opacity-75"
            onClick={() => setToggleSIdeBar(!toggleSIdeBar)}
          >
            <X />
          </button>
          <Image
            className=" h-10 w-fit "
            src="/logo.png"
            alt="Logo"
            width="100"
            height="100"
          />
        </div>

        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>

        <div className="flex h-full   justify-end  flex-col space-y-10 w-full">
          <hr></hr>
       
          <form action={logout}>
            <SubmitButton title={t("logout")} />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
