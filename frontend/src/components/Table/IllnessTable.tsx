'use client'
import type { FC } from "react";
import { ResponseIllnessType } from "./ReusableTable";
import { IllnessType } from "@/types/illness";
import generatePaginationLinks from "./PaginationControls";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitButton } from "../ui/SubmitButton";
import { deleteAction } from "@/actions/illnesses/delete";
import toast from "react-hot-toast";
import { restoreAction } from "@/actions/illnesses/restore";

interface IllnessTableProps {
  data: ResponseIllnessType | undefined
}

const IllnessTable: FC<IllnessTableProps> = ({data}) => {
  const items: IllnessType[] | undefined = data?.data;


  const router = useRouter();



  async function onDelete(format: FormData) {

    const result = await deleteAction(format);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Deleted Successfully ");
    }
  }


 async function onRestore(format: FormData) {
   const result = await restoreAction(format);
   if (result?.error) {
     toast.error(result?.error);
   } else {
     toast.success("Restored Successfully ");
   }
 }




  // fill query url
  const updateIt = (item: any) => {
    let url = `?&name=${item.name}&title=${item.title}&company=&title=${item.title}${item.company}&contact=${item.contact}&id=${item.id}`;
    router.push(url);
  };

  return (
    <div className="rounded-lg border border-gray-200 min-h-40">
      <div className="overflow-x-auto rounded-t-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right px-4">
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
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 px-4">
            {items?.map((item: IllnessType) => (
              <tr
                key={item.id}
                className={
                  (item.deleted_at && "bg-gray-200/70 text-white") || ""
                }
              >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.associations}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.created_at}
                </td>
                <td className="whitespace-nowrap px-4 py-2 flex items-center gap-2">
                  {item.deleted_at ? (
                    <form action={onRestore}>
                      <input hidden type="number" name="id" value={item.id} />

                      <SubmitButton
                        style="inline-block rounded text-red-600  py-2 text-xs font-medium hover:text-red-700  duration-150"
                        title="Restore"
                        loadingForm="Restoring"
                      />
                    </form>
                  ) : (
                    <form action={onDelete}>
                      <input hidden type="number" name="id" value={item.id} />
                      <SubmitButton
                        style="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150"
                        title="delete"
                        loadingForm="deleting"
                      />
                    </form>
                  )}

                  <a
                    href="#"
                    className="inline-block rounded text-green-600  py-2 text-xs font-medium  hover:text-green-700 duration-150"
                  >
                    edit
                  </a>
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
