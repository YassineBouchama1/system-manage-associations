'use client'
import { useState, type FC } from "react";
import { ResponseIllnessType } from "../ReusableTable";
import { IllnessType } from "@/types/illness";

import { SubmitButton } from "../../ui/SubmitButton";
import { deleteAction } from "@/actions/illnesses/delete";
import toast from "react-hot-toast";
import { restoreAction } from "@/actions/illnesses/restore";
import Modal from "../../Modal";
import FormIllnessUpdate from "../../Forms/FormIllnessUpdate";
import { useTranslations } from "next-intl";
import { ChevronDown, Filter, MoveUp, Plus, Search } from "lucide-react";
import PaginationControls from "../PaginationControls";
import { AssociationType } from "@/types/association";
import BodyTable from "./BodyTable";

interface AssociationTableProps {
  associations: AssociationType[];
}

const AssociationTable: FC<AssociationTableProps> = ({ associations }) => {
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
          {associations.map((item: AssociationType) => (
            <BodyTable key={item.id} association={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AssociationTable;
