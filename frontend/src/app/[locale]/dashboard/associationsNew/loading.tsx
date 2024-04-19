import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import Link from "next/link";
import React from "react";

export default function Loading() {
  return (
    <>
      <div className="w-full flex justify-center md:justify-end">
        <div
          className=" bg-gray-300 min-w-24 animate-pulse px-2 py-3 rounded-md text-gray-300 text-end"
        >
          Add New association
        </div>
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
