"use client";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
} from "lucide-react";
import SidebarItem from "./item";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/getSessions";
import { useAuthContext } from "@/hooks/useAuthProvider";
import { logout } from "@/actions/profile";
import { SubmitButton } from "../ui/SubmitButton";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../next-intl/LocaleSwitcher";

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
      icon: LayoutDashboard,
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

  //bring session
  useEffect(() => {
    const fetchSessions = async () => {
      const session = await getSession();
      console.log(session);
      setName(session?.name);
    };
    fetchSessions();
  }, []);


  return (
    <div className="h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full h-full ">
        {/* <img className="h-10 w-fit" src="/logo-expanded.png" alt="Logo" /> */}
        <h2>{session ? session.name : "loading"}</h2>
        <div className="flex flex-col space-y-2">
          {items
            .filter((item) => item.role === "admin")
            .map((item, index) => (
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
    </div>
  );
};

export default Sidebar;
