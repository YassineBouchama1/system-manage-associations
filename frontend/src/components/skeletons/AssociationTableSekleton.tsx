import type { FC } from 'react';

interface AssociationTableSekletonProps {}

const AssociationTableSekleton: FC<AssociationTableSekletonProps> = ({}) => {
        return (
                <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="mx-auto max-w-screen-xl ">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden min-h-90"></div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="ltr:text-left rtl:text-right text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Product name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    City
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="ltr:text-left rtl:text-right">
                {/* items  */}
            
              </tbody>
            </table>
          </div>
               </div>
 
    </section>

        );
}
export default AssociationTableSekleton;