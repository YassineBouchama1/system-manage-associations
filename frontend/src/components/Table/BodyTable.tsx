import type { FC } from "react";

interface BodyTableProps {}

const BodyTable: FC<BodyTableProps> = ({}) => {
  return (

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
            
          </tbody>
       
  );
};
export default BodyTable;
