"use client";

import { cn } from "@/lib/utils";
import { ItemType } from "@/types/generale";

export function ItemsStatus({ item }: { item:ItemType }) {
  const { icon: Icon, title, data, color, bgColor } = item;

  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1 bg-white flex flex-row items-start justify-between w-full   h-auto rounded-xl py-2 px-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="font-semibold text-lg">{data}</p>
      </div>
      <div className={cn("rounded-[23px] p-4", `bg-[#${bgColor}]/70`)}>
        <Icon size={50} color={color} />
      </div>
    </div>
  );
}
