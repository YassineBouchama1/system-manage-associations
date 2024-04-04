import React from "react";

interface TableData {
  id?: number;
  customer?: string;
  purchaseDate?: string;
  title?: string;
}


// ReusableTable component
export default function ReusableTable({
  data,
  columns,
}: {
  data: unknown ;
  columns: string[];
}) {
  return (
    <div className="bg-white">
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <HeaderTable columns={columns} />
          <tbody>
            <RenderTableBody data={data} columns={columns} />
          </tbody>
        </table>
      </div>
      <PaginationTable data={data} />
    </div>
  );
}

// HeaderTable component
function HeaderTable({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((col) => (
          <th
            key={col}
            scope="col"
            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            {col}
          </th>
        ))}
        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
          Actions
        </th>
      </tr>
    </thead>
  );
}

// RenderTableBody component
function RenderTableBody({
  data,
  columns,
}: {
  data: any[];
  columns: string[];
}) {
  if (!data || data.length === 0) {
    return (
      <tr>
        <td
          colSpan={columns.length + 1}
          className="text-center py-4 text-gray-600 dark:text-gray-400"
        >
          {data ? "No data found." : "Loading data..."}
        </td>
      </tr>
    );
  }

  return (
    <>
      {data.map((item: any, index: number) => (
        <tr
          key={index}
          tabIndex={index}
          className=" focus:outline-none h-16 border border-gray-100 rounded "
        >
          {columns.map((col, colIndex) => (
            <td key={colIndex}>
              <div className="flex items-center">
                <p className="text-sm leading-none text-gray-600 ml-2">
                  {item[col]}
                </p>
              </div>
            </td>
          ))}
          <td className="flex gap-2 items-center ">
            <div className="flex items-center">
              <button className="focus:ring-2 focus:ring-offset-2  focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                View
              </button>
            </div>

            <div className="relative px-5 pt-2">
              <button
                className="focus:ring-2 rounded-md focus:outline-none"
                role="button"
                aria-label="option"
              >
                ...
              </button>

              {/* btns */}
              <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
           btns
              </div>
              {/* btns */}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

// HeaderTable component
function PaginationTable({ data }: { data: any[] }) {
  console.log(data);
  return (
    <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
      <a
        href="#"
        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>

        <span>previous</span>
      </a>

      <a
        href="#"
        className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span>Next</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>
  );
}