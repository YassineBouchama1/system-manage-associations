'use client'
import { Building2, Dna, LayoutDashboard, UserRoundCheck, Users } from "lucide-react";
import { ItemsStatus } from "./ItemsStatus";
import { ItemType } from "@/types/generale";

const CardStatus = () => {

    const items: ItemType[] = [
      {
        title: "Total Cases",
        data: "252,252",
        icon: Users,
        color: "#8280FF",
        bgColor: "8280FF",
      },
      {
        title: "Total Association",
        data: "163",
        icon: Building2,
        color: "#FEC53D",
        bgColor: "#8280FF",
      },
      {
        title: "Total illnesses",
        data: "252,252",
        icon: Dna,
        color: "#4AD991",
        bgColor: "#8280FF",
      },
      {
        title: "Total Operatores",
        data: "252,252",
        icon: UserRoundCheck,
        color: "#FF9066",
        bgColor: "#8280FF",
      },
    ];

    return (
      <section className=" grid  grid-cols-4 grid-rows-1  gap-6 ">
        {items.map((item) => (
          <ItemsStatus key={item.title} item={item} />
        ))}
      </section>
    );

}
export default CardStatus;