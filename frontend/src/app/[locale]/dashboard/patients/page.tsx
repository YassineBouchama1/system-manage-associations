import { fetchPatients } from "@/actions/patients";
import PaginationControls from "@/components/Table/PaginationControls";
import FilterTable from "@/components/Table/Patinet/FilterTable";
import PatinetsTable from "@/components/Table/Patinet/PatinetsTable";
import { delay } from "@/lib/delay";

import { getSession } from "@/lib/getSessions";

import { getTranslations } from "next-intl/server";
import React from "react";

// default value for  query
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;


export default async function Associations({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  // await delay(6000)
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
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden min-h-90">
          <FilterTable />
          <PatinetsTable patients={success.data} />
          <PaginationControls
            hasNextPage={success?.current_page! < success?.total_pages!}
            hasPrevPage={success?.current_page! > 1}
            totalPages={success?.total_pages!}
            currentPage={success?.current_page!}
          />
        </div>
      </div>
    </section>
  );
};


