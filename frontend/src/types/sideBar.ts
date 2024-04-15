import { LucideIcon } from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};



export interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  role?: string | number;
  items?: ISubItem[];
}

export interface ISubItem {
  name: string;
  path: string;
  role?: string;
}