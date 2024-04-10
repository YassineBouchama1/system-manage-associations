import { fetchAssociations } from "@/actions/associations";
import PaginationControls from "@/components/Table/PaginationControls";
import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import AssociationCard from "@/components/ui/AssociationCard";
import TitlePage from "@/components/ui/TitlePage";
import { delay } from "@/lib/delay";
import { AssociationType } from "@/types/association";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

// default value for  query
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 2;


export default async function Associations({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // fetching illness  & passing query {page,per_page}
  const combinedParams = {
    ...searchParams,
    page: searchParams.page?.toString() || DEFAULT_PAGE.toString(),
    per_page: searchParams.per_page?.toString() || DEFAULT_PER_PAGE.toString(),
  };

  const { success, error } = await fetchAssociations(combinedParams);

  if (error) {
    throw new Error(error.toString());
  }

  const t = await getTranslations("ui");
  return (
    <>
      <div className="w-full flex justify-center md:justify-end">
        <PaginationControls
          hasNextPage={success.current_page < success.total_pages}
          hasPrevPage={success.current_page > 1}
          totalPages={success.total_pages}
          currentPage={success.current_page}
        />
        <Link
          href="/dashboard/associations/create"
          className=" bg-theme-color min-w-24 text-center px-2 py-3 rounded-md text-white "
        >
          {t("create")}
        </Link>
      </div>
      <div className=" mt-4 flex gap-6 flex-wrap justify-center md:justify-start">
        {success.data.length === 0 ? (
          <h2>No Assosoations</h2>
        ) : (
          success.data.map((item: AssociationType) => (
            <AssociationCard key={item.id} association={item} />
          ))
        )}
      </div>
    </>
  );
};


