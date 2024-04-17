'use client'
import { Building2, Dna, LayoutDashboard, UserRoundCheck, Users } from "lucide-react";
import { ItemsStatus } from "./ItemsStatus";
import { ItemType } from "@/types/generale";
import { useTranslations } from "next-intl";

const CardStatus = ({ itemCards }:{ itemCards:any }) => {

  const t = useTranslations('ui')
  const items: ItemType[] = [
    {
      title: t("number_of_Patients"),
      data: itemCards.patients >= 0 ? itemCards.patients : null,
      icon: Users,
      color: "#8280FF",
      bgColor: "8280FF",
    },
    {
      title: t("number_of_Association"),
      data: itemCards.associations >= 0 ? itemCards.associations : null,
      icon: Building2,
      color: "#FEC53D",
      bgColor: "#8280FF",
    },
    {
      title: t("number_of_Illnesses"),
      data: itemCards.illnesses >= 0 ? itemCards.illnesses : null,
      icon: Dna,
      color: "#4AD991",
      bgColor: "#8280FF",
    },
    // {
    //   title: "Total Patients",
    //   data: itemCards.patients ? itemCards.patients : null,
    //   icon: UserRoundCheck,
    //   color: "#FF9066",
    //   bgColor: "#8280FF",
    // },
  ];

  return (
    <section className=" grid  grid-cols-4 grid-rows-1  gap-6 ">
      {items.filter((item)=>item.data != null).map((item) => (
        <ItemsStatus key={item.title} item={item} />
      ))}
    </section>
  );
};
export default CardStatus;