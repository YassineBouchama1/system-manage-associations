import { ISidebarItem } from "@/types/sideBar";
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
import { useTranslations } from 'next-intl';
import { getTranslations } from "next-intl/server";
import type { FC } from 'react';

interface constantsProps {}


export default async function SidebarItems({}){
   const t = await getTranslations("sideBar");

  //list of 
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
      name: t("illnesses"),
      path: "/dashboard/illnesses",
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
    return items;
}
