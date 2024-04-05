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
    <div className="rounded-lg border border-gray-200">
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
   
      <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
        <ol className="flex justify-end gap-1 text-xs font-medium">
          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>

          {/* {paginationLinks} */}

          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
};
export default IllnessTable;
