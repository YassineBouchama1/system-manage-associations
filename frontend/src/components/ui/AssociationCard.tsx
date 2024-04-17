'use client'
import { Ellipsis, FilePenLine, MapPin, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { SubmitButton } from './SubmitButton';
import { AssociationType } from '@/types/association';
import toast from 'react-hot-toast';
import { deleteAction } from '@/actions/associations/delete';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface AssociationCardProps {
  association: AssociationType;
}

const AssociationCard: FC<AssociationCardProps> = ({ association }) => {
const t = useTranslations('ui')

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
        association.deleted_at && "opacity-15 disabled"
      }  bg-white gap-y-1 py-3 w-[260px] h-[260px] rounded-xl flex flex-col justify-start items-center`}
    >
      <Link 
      className='hover:scale-105 duration-100 '
      href={`/dashboard/associations/profile/${association.id}`}>
        <Image
          src={association.logo}
          alt="assostaion"
          width="200"
          height="200"
          className="size-24 rounded-full mb-3"
        />
      </Link>
      <h4 className="font-semibold">{association.name}</h4>
      <div className="flex gap-x-2 items-center">
        <MapPin size={14} color="black" absoluteStrokeWidth />
        <p className="text-black">{association && association.city}</p>
      </div>
      <p>{association && association.email}</p>
      <div className="w-auto px-2  h-7 border-2 rounded-md flex items-center justify-center gap-x-2">
        <Link href={`/dashboard/associations/${association.id}`}>
          <FilePenLine size={20} />
        </Link>
        <div className="h-full w-[1px] bg-black/30"></div>

        <form action={onDelete}>
          <input hidden type="number" name="id" value={association.id} />
          <SubmitButton
            style="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150"
            title={t("delete")}
            loadingForm={t("deleting")}
          />
        </form>
      </div>
    </div>
  );
};
export default AssociationCard;