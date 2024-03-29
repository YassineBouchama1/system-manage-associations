import type { FC } from "react";

interface HeaderTableProps {}

const HeaderTable: FC<HeaderTableProps> = ({}) => {
  return (
    <div className="bg-white  ">
      <div className=" overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                check
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Customer
              </th>

              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Purchase
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Purchase
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Purchase
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Purchase
              </th>
              <th
                scope="col"
                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              tabIndex={0}
              className="focus:outline-none h-16 border border-gray-100 rounded"
            >
              <td>
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    Urgent
                  </p>
                </div>
              </td>

              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
              <td className="pl-5">
                <div className="flex items-center">
                  <p className="text-sm leading-none text-gray-600 ml-2">
                    04/07
                  </p>
                </div>
              </td>
            </tr>
            <tr className="h-3"></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HeaderTable;
