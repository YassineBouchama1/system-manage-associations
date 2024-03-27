import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import Link from "next/link";
import React from "react";

export default function Loading() {
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
      <div className="mt-4 flex gap-6 flex-wrap justify-center md:justify-start">
        <AssociationCardSkeleton />
        <AssociationCardSkeleton />
        <AssociationCardSkeleton />
        <AssociationCardSkeleton />
        <AssociationCardSkeleton />
        <AssociationCardSkeleton />
      </div>
    </>
  );
}
