'use client'
import { Ellipsis, FilePenLine, MapPin, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { SubmitButton } from './SubmitButton';
import { AssociationType } from '@/types/association';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { PatienType } from '@/types/patiens';
import { deleteAction } from '@/actions/patients/delete';
import { useTranslations } from 'next-intl';
import { restoreAction } from '@/actions/patients/restore';

interface PatientCardProps {
  patient: PatienType;
}

const PatientCard: FC<PatientCardProps> = ({ patient }) => {
  const t = useTranslations("ui");

  // to restore patient by passing id i
  async function onRestore() {
    const result = await restoreAction(patient.id);
    if (result?.error) {
      toast.error(result?.error);
    } else {
      toast.success("Restored Successfully ");
    }
  }

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
  return (
    <div
      className={`${
        patient.deleted_at && "opacity-15"
      }  bg-white gap-y-1 py-3 w-[260px] h-[260px] rounded-xl flex flex-col justify-start items-center`}
    >
      <Image
        src={patient.avatar}
        alt="patient"
        width="200"
        height="200"
        className="size-24 rounded-full mb-3"
      />
      <h4 className="font-semibold">
        {patient.first_name + " " + patient.last_name}
      </h4>
      <div className="flex gap-x-2 items-center">
        <MapPin size={14} color="black" absoluteStrokeWidth />
        <p className="text-black">{patient && patient.city}</p>
      </div>
      {/* <p>{patient && patient.association}</p> */}
      <div className="w-auto px-2  h-7 border-2 rounded-md flex items-center justify-center gap-x-2">
        {patient.deleted_at ? (
          <form action={onRestore} className="bg-blue-500 rounded-md px-2">
            <input hidden type="number" name="id" value={patient.id} />
            <SubmitButton
              style="inline-block rounded text-white  py-2 text-xs font-medium hover:text-blue-700  duration-150"
              title={t("restore")}
              loadingForm={t("restore") + "..."}
            />
          </form>
        ) : (
          <>
            <Link href={`/dashboard/patients/${patient.id}`}>
              <FilePenLine size={20} />
            </Link>
            <div className="h-full w-[1px] bg-black/30"></div>

            <form action={onDelete}>
              <input hidden type="number" name="id" value={patient.id} />
              <SubmitButton
                style="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150"
                title="delete"
                loadingForm="deleting"
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default PatientCard;