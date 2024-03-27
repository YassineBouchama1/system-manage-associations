import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import AssociationCard from "@/components/ui/AssociationCard";
import TitlePage from "@/components/ui/TitlePage";
import { delay } from "@/lib/delay";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const Transaction = async() => {
 await delay(1000)
const t = await getTranslations('ui')
  return <div>page illnesses</div>;
};

export default Transaction;
