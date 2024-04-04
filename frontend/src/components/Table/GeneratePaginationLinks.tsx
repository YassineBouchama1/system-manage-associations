'use client'
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";



type PaginationProps = {
  totalPages: number | undefined;
  currentPage?: number; // Make currentPage optional with a default of 1
};

export default function generatePaginationLinks({ totalPages = 1, currentPage = 1 }: PaginationProps) {
 

 const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {

    return `${pathname}?page=${pageNumber}`;
  };

//  const searchParams = useSearchParams();
//  const currentPage = Number(searchParams.get("page")) || 1;

//  const createPageURL = (pageNumber: number | string) => {
//    const params = new URLSearchParams(searchParams);
//    params.set("page", pageNumber.toString());
//    return `${pathname}?${params.toString()}`;
//  };

  if (totalPages <= 0) {
    throw new Error("Total pages must be a positive integer.");
  }


  const paginationLinks = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationLinks.push(
      <li key={page}>
        <Link
          href={`${pathname}/&page=${page}`}
          aria-checked={page === currentPage}
          style={{ backgroundColor: page === currentPage ? "gray" : "none" }}
          className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          {page}
        </Link>
      </li>
    );
  }

  return paginationLinks;
}
