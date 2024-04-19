import { fetchAssociations } from "@/actions/associations";
import AssociationTable from "@/components/Table/AssociationTable";

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

  const { success, error } = await fetchAssociations(
    combinedParams
  );

  if (!success || error) {
    throw new Error(error.toString());
  
  }



  const t = await getTranslations("ui");
  return (
   
       
            <AssociationTable />
      
    
  );
};


