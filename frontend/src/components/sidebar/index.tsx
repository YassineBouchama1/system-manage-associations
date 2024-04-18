"use client";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
  LogOut,
  ShieldOff,
  X,
  Building2,
  UsersRound,
} from "lucide-react";
import SidebarItem from "./item";
import { useEffect, useMemo, useState } from "react";
import { getSession } from "@/lib/getSessions";
import { useAuthContext } from "@/hooks/useAuthProvider";
import { logout } from "@/actions/profile";
import { SubmitButton } from "../ui/SubmitButton";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { ISidebarItem } from "@/types/sideBar";
import { useAppDispatch, useAppSelector } from "@/redux/Hook";
import {  toggleSidebar } from "@/redux/ThemeSlice";
import { SessionData } from "@/lib/optionsSessions";
import Link from "next/link";



const Sidebar = ({ session }: { session: SessionData}) => {
  const t = useTranslations("sideBar");

  //list of
  const items: ISidebarItem[] = useMemo(
    () => [
      {
        name: t("dashboard"),
        path: "/dashboard",
        icon: LayoutDashboard,
        role: 0,
      },
      {
        name: t("associations"),
        path: "/dashboard/associations",
        icon: Building2,
        role: 1,
      },
      {
        name: t("illnesses"),
        path: "/dashboard/illnesses",
        icon: ShieldOff,
        role: 1,
      },
      {
        name: t("patients"),
        path: "/dashboard/patients",
        icon: UsersRound,
        role: 0,
      },
      // {
      //   name: t("operators"),
      //   path: "/dashboard/operators",
      //   icon: UsersRound,
      //   role: "admin",
      // },
      // {
      //   name: t("settings"),
      //   path: "/dashboard/settings",
      //   icon: Settings,
      //   role: "admin",

      //   items: [
      //     {
      //       name: "General",
      //       path: "/dashboard/settings",
      //       role: "admin",
      //     },
      //     {
      //       name: "Security",
      //       path: "/dashboard/settings/security",
      //     },
      //     {
      //       name: "Notifications",
      //       path: "/dashboard/settings/notifications",
      //     },
      //   ],
      // },
    ],
    []
  );
  const [name, setName] = useState<string | undefined>("");

  const toggleSIdeBar = useAppSelector((state) => state.theme.sideBar);



  const dispatch = useAppDispatch();
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
            onClick={() => dispatch(toggleSidebar())}
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
          {items
            .filter((item) => item.role === session.role || item.role === 0)
            .map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
        </div>

        <div className="flex h-full   justify-end  flex-col space-y-10 w-full">
          <hr></hr>
          <Link
            className="flex items-center  p-3 rounded-lg space-x-2 gap-x-2 hover:text-sidebar-background cursor-pointer hover:bg-sidebar-active"
            href="/dashboard/settings"
          >
            <Settings size={20} />{" "}
            <p className="text-sm font-semibold">{t("settings")}</p>
          </Link>
          <form action={logout}>
            <SubmitButton title={t("logout")} />
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
