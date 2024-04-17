"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { navigate } from "@/actions/navigate";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  currentPage: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";

  return (
    <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
      <ol className="flex justify-end gap-1 text-xs font-medium">
        <li>
          <button
            disabled={!hasNextPage}
            onClick={() => {
              router.push(
                `${pathname}/?page=${Number(page) + 1}&per_page=${per_page}`
              );
            }}
            className={`${
              !hasNextPage && "opacity-25 bg-gray-300"
            } inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180`}
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
          </button>
        </li>
        <li className="inline-flex size-8 items-center justify-center rounded  bg-white text-gray-900 ">
          {currentPage} / {totalPages}
        </li>
        <li>
          <button
            disabled={!hasPrevPage}
            onClick={() => {
              router.push(
                `${pathname}/?page=${Number(page) - 1}&per_page=${per_page}`
              );
            }}
            className={`${
              !hasPrevPage && "opacity-25 bg-gray-300"
            } inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180`}
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
          </button>
        </li>
      </ol>
    </div>
  );
};

export default PaginationControls;
