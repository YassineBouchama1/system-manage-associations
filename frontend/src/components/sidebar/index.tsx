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

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    role: "admin",
  },
  {
    name: "transaction",
    path: "/dashboard/transaction",
    icon: LayoutDashboard,
    role: "admin",
  },
  {
    name: "Settings",
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

const Sidebar = () => {
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
      <div className="flex flex-col space-y-10 w-full">
        {/* <img className="h-10 w-fit" src="/logo-expanded.png" alt="Logo" /> */}
        <h2>
          {name ? name : "loading"} {session ? session.name : "loading"}
        </h2>
        <div className="flex flex-col space-y-2">
          {items
            .filter((item) => item.role === 'admin')
            .map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
        </div>
        <form action={logout}>
          <SubmitButton title="logout" />
        </form>
      </div>
    </div>
  );
};

export default Sidebar;
