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

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "transaction",
    path: "/dashboard/transaction",
    icon: LayoutDashboard,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    items: [
      {
        name: "General",
        path: "/dashboard/settings",
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
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        {/* <img className="h-10 w-fit" src="/logo-expanded.png" alt="Logo" /> */}
        <h2>logo</h2>
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
