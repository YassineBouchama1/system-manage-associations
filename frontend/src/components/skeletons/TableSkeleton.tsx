export function TableSkeleton() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 shadow-md">
      <div className="mx-auto max-w-screen-xl ">
        <div className="bg-white dark:bg-gray-800   sm:rounded-lg overflow-hidden min-h-90 mx-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center   text-gray-200">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    
                  </div>
                  <input
                    disabled
                    name="query"
                    id="query"
                    type="text"
                    className=" bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg  pl-10 p-2 "
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                type="button"
                disabled
                className="bg-gray-200  text-gray-200 flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium  border border-gray-200 rounded-lg focus:outline-none "
              >
                Create
              </button>
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  type="button"
                  disabled
                  className="bg-gray-200  text-gray-200 flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium  border border-gray-200 rounded-lg focus:outline-none  "
                >
                  Export
                </button>

                <button
                  className={` bg-gray-200  text-gray-200 relative w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium rounded-lg border border-gray-200 `}
                  type="button"
                  disabled
                >
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="ltr:text-left rtl:text-right text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4 ">
                    <div className="bg-gray-200 rounded-full  text-gray-200">
                      loading...
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="bg-gray-200 rounded-full  text-gray-200">
                      loading...
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="bg-gray-200 rounded-full  text-gray-200">
                      loading...
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="bg-gray-200 rounded-full  text-gray-200">
                      loading...
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <div className="bg-gray-200 rounded-full  text-gray-200">
                      loading...
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">
                      <div className="bg-gray-200 rounded-full  text-gray-200">
                        loading...
                      </div>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="ltr:text-left rtl:text-right">
                {Array.from({ length: 10 }).map((_item: any, index: number) => (
                  <tr key={index} className="border-b ">
                    <td className="flex items-center ">
                      <svg
                        className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </td>

                    <td className=" py-3 h-4 ">
                      <div className="bg-gray-200 rounded-full text-gray-200">
                        loading...
                      </div>
                    </td>
                    <td className=" py-3 h-4 ">
                      <div className="bg-gray-200 rounded-full  text-gray-200 ">
                        loading...
                      </div>
                    </td>
                    <td className=" py-3 h-4 ">
                      <div className="bg-gray-200 rounded-full  text-gray-200">
                        loading...
                      </div>
                    </td>
                    <td className=" py-3 h-4 ">
                      <div className="bg-gray-200 rounded-full  text-gray-200">
                        loading...
                      </div>
                    </td>
                    <td className=" py-3 h-4 ">
                      <div className="bg-gray-200 rounded-full  text-gray-200">
                        loading...
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
