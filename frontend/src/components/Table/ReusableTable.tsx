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
  data: TableData[];
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
  data: TableData[];
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
      {data.map((item: any, index:number) => (
        <tr
          key={index}
          tabIndex={0}
          className="focus:outline-none h-16 border border-gray-100 rounded pr-2"
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
          <td>
            <div className="flex items-center">
              <p className="text-sm leading-none text-gray-600 ml-2">Actions</p>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
