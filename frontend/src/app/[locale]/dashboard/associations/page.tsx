import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import AssociationCard from "@/components/ui/AssociationCard";
import TitlePage from "@/components/ui/TitlePage";
import { delay } from "@/lib/delay";
import Link from "next/link";
import React from "react";

const Transaction = async() => {
 await delay(2000)

  return (
    <>

      <div className="w-full flex justify-center md:justify-end">
        <Link
          href="/dashboard/associations/create"
          className=" bg-theme-color px-2 py-3 rounded-md text-white text-end"
        >
          Add New association
        </Link>
      </div>
      <div className=" mt-4 flex gap-6 flex-wrap justify-center md:justify-start">
        <AssociationCard />
        <AssociationCard />
        <AssociationCard />
        <AssociationCard />
        <AssociationCard />
        <AssociationCard />
      </div>
    </>
  );
};

export default Transaction;
