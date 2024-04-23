import { fetchAssociations } from "@/actions/associations";
import { fetchPatients } from "@/actions/patients";
import PaginationControls from "@/components/Table/PaginationControls";
import AssociationCardSkeleton from "@/components/skeletons/AssociationCardSkeleton";
import AssociationCard from "@/components/ui/AssociationCard";
import PatientCard from "@/components/ui/PatientCard";
import TitlePage from "@/components/ui/TitlePage";
import { delay } from "@/lib/delay";
import { getSession } from "@/lib/getSessions";
import { AssociationType } from "@/types/association";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

// default value for  query
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;


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

  
  const { success, error } = await fetchPatients(combinedParams);

 if (!success || error) {
   throw new Error(error.toString());
 }


  const t = await getTranslations("ui");

    const session = await getSession();

   
  return (
    <>
      <div className="w-full flex justify-center md:justify-end">
        <PaginationControls
          hasNextPage={success.current_page < success.total_pages}
          hasPrevPage={success.current_page > 1}
          totalPages={success.total_pages}
          currentPage={success.current_page}
        />
        {session.role === 2 && (
          <Link
            href="/dashboard/patients/create"
            className=" bg-theme-color min-w-24 text-center px-2 py-3 rounded-md text-white "
          >
            {t("create")}
          </Link>
        )}
      </div>
      <div className=" mt-4 flex gap-6 flex-wrap justify-center md:justify-start">
        {success.data.length === 0 ? (
          <h2>No patiens</h2>
        ) : (
          success.data.map((item: PatienType) => (
            <PatientCard key={item.id} patient={item} />
          ))
        )}
      </div>
    </>
  );
};


