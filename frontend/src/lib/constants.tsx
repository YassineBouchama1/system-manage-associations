import { SideNavItem } from '@/types/sideBar';
import { Icon } from '@iconify/react';


export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "associations",
    path: "/associations",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
 

  },

];
