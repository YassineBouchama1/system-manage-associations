import { AssociationType } from '@/types/association';
import Image from 'next/image';
import type { FC } from 'react';
import { SubmitButton } from '../../ui/SubmitButton';
import Link from 'next/link';
import { FilePenLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { restoreAction } from '@/actions/associations/restore';
import { deleteAction } from '@/actions/associations/delete';

interface BodyTableProps {
  association: AssociationType
}

const BodyTable: FC<BodyTableProps> = ({association}) => {
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

  // to restore association by passing id i
  async function onRestore() {
    const result = await restoreAction(association.id);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Restored Successfully ");
    }
  }

  // return status for each association
  const colorStatus = (status: string) => {
    let color = "green";
    switch (status) {
      case "active":
        color = "green";
        break;
      case "inactive":
        color = "red";
        break;

      case "suspended":
        color = "black";
        break;

      case "deleted":
        color = "blue";
        break;
      default:
        break;
    }

    return (
      <span
        className={`text-white relative inline-block px-3 py-1 font-semibold  leading-tight`}
      >
        <span
          aria-hidden
          className={`bg-${color}-500 absolute inset-0  opacity-50 rounded-full`}
        ></span>
        <span className="relative">{association && association.status}</span>
      </span>
    );
  };

  return (
    <tr className="border-b dark:border-gray-700 ">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Image
          src={association.logo}
          alt="assostaions"
          width="200"
          height="200"
          className="w-10 h-10 rounded-full"
        />
        <Link
          href={`/dashboard/associations/profile/${association.id}`}
          className="ps-3 hover:scale-105 duration-100
          "
        >
          <div className="text-base font-semibold">{association.name}</div>
          <div className="font-normal text-gray-500">
            {association && association.email}
          </div>
        </Link>
      </th>
      <td className="px-4 py-3"> {association && association.illness} </td>
      <td className="px-4 py-3">{association && association.city}</td>
      <td className="px-4 py-3">{colorStatus(association.status)}</td>
      <td className="px-4 py-3 flex  justify-center items-center">
        {association.deleted_at ? (
          <form action={onRestore}>
            <input hidden type="number" name="id" value={association.id} />
            <SubmitButton
              style="text-blue-500  py-2 text-xs font-medium hover:text-blue-700  duration-150"
              title={t("restore")}
              loadingForm={t("restore") + "..."}
            />
          </form>
        ) : (
          <div
            className={`w-auto px-2  flex items-center justify-center gap-x-2`}
          >
            <Link
              href={`/dashboard/associations/${association.id}`}
              className="text-green-500"
            >
              Edit
            </Link>
            <div className="h-full w-[1px] bg-black/30"></div>

            <form action={onDelete}>
              <input hidden type="number" name="id" value={association.id} />
              <SubmitButton
                style="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150"
                title={t("delete")}
                loadingForm={t("deleting") + "..."}
              />
            </form>
          </div>
        )}
      </td>
    </tr>
  );
}
export default BodyTable;