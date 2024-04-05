'use client'
import type { FC } from "react";
import { ResponseIllnessType } from "./ReusableTable";
import { IllnessType } from "@/types/illness";
import generatePaginationLinks from "./PaginationControls";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IllnessTableProps {
  data: ResponseIllnessType | undefined
}

const IllnessTable: FC<IllnessTableProps> = ({data}) => {

  const items: IllnessType[] | undefined =  data?.data;
  const totalPages: number | undefined = data?.total_pages;
  const currentPage: number | undefined = data?.current_page;

const searchParams = useSearchParams()

  //generate links pagination by passing number of pages avaibale
// const paginationLinks = generatePaginationLinks({ totalPages, currentPage });
//  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
//  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  return (
    <div className="rounded-lg border border-gray-200 min-h-40">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Associations N*
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Created At
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items?.map((item: IllnessType) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.associations}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.created_at}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   
     
    </div>
  );
};
export default IllnessTable;
