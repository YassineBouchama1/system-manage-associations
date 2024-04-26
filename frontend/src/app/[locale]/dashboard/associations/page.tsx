import { fetchAssociations } from "@/actions/associations";
import { fetchSelectors } from "@/actions/fetchFiltersSelectors/fetchSelectors";
import AssociationTable from "@/components/Table/Association/AssociationTable";
import FilterTable from "@/components/Table/Association/FilterTable";
import PaginationControls from "@/components/Table/PaginationControls";

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

  //fetch list of selectors <illnesses - association>  id - name
   const { success: selectorsData, error: selectorsError } =
    await fetchSelectors();

  const { success, error } = await fetchAssociations(combinedParams);

  if (!success || error) {
    throw new Error(error.toString());
  }

  const t = await getTranslations("ui");
  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden min-h-90">
          <FilterTable illnesses={selectorsData.illnesses} />
          <AssociationTable associations={success.data} />
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


