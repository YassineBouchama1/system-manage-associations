'use client'

import { deleteAction } from "@/actions/illnesses/delete";
import toast from "react-hot-toast";
import { restoreAction } from "@/actions/illnesses/restore";

import { useTranslations } from "next-intl";

import BodyTable from "./BodyTable";
import { PatientType } from "@/types/patients";
import { FC } from "react";

interface PatinetsTableProps {
  patients: PatientType[];
}

const PatinetsTable: FC<PatinetsTableProps> = ({ patients }) => {
  const t = useTranslations("ui");
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
    <div className="overflow-x-auto min-h-[300px]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="ltr:text-left rtl:text-right text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-4">
              name
            </th>
            <th scope="col" className="px-4 py-3">
              Category
            </th>
            <th scope="col" className="px-4 py-3">
              City
            </th>
            <th scope="col" className="px-4 py-3">
              Association
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
          {patients.map((item: PatientType) => (
            <BodyTable key={item.id} patient={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PatinetsTable;
