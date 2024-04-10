'use client'
import { useState, type FC } from "react";
import { ResponseIllnessType } from "./ReusableTable";
import { IllnessType } from "@/types/illness";

import { SubmitButton } from "../ui/SubmitButton";
import { deleteAction } from "@/actions/illnesses/delete";
import toast from "react-hot-toast";
import { restoreAction } from "@/actions/illnesses/restore";
import Modal from "../Modal";
import FormIllnessUpdate from "../Forms/FormIllnessUpdate";

interface IllnessTableProps {
  data: ResponseIllnessType | undefined
}

const IllnessTable: FC<IllnessTableProps> = ({data}) => {
  const items: IllnessType[] | undefined = data?.data;
  const [isOpen, setIsOpen] = useState<number | null>(null); 


  // delete illness
  async function onDelete(format: FormData) {
    //sending request to action <server action>
    const result = await deleteAction(format);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Deleted Successfully ");
    }
  }

  // to restore illness by passing id in formdata
  async function onRestore(format: FormData) {
    const result = await restoreAction(format);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Restored Successfully ");
    }
  }

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

                  <button
                    onClick={() => setIsOpen(item.id)}
                    className="inline-block rounded text-green-600 py-2 text-xs font-medium hover:text-green-700 duration-150"
                  >
                    edit
                  </button>
                  {isOpen === item.id && (
                    <Modal
                      isOpen={isOpen === item.id}
                      onClose={() => setIsOpen(null)}
                    >
                      <FormIllnessUpdate
                        id={item.id}
                        name={item.name}
                        // onClose={() => setIsOpen(null)}
                      />
                    </Modal>
                  )}
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
