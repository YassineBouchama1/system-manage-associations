"use client";

import { cn } from "@/lib/utils";
import { ItemType } from "@/types/generale";

export function ItemsStatus({ item }: { item:ItemType }) {
  const { icon: Icon, title, data, color, bgColor } = item;

  return (
    <div className="bg-white flex flex-row items-center justify-between w-full h-32 rounded-md py-2 px-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm">{title}</p>
        <p className="font-semibold text-lg">{data}</p>
      </div>
      <div className={cn("rounded-[23px] p-4", `bg-[#${bgColor}]/70`)}>
        <Icon size={40} color={color} />
      </div>
    </div>
  );
}
