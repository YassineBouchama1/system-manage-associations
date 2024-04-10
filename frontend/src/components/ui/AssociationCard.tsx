'use client'
import { Ellipsis, FilePenLine, MapPin, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { SubmitButton } from './SubmitButton';
import { AssociationType } from '@/types/association';
import toast from 'react-hot-toast';
import { deleteAction } from '@/actions/associations/delete';
import Link from 'next/link';

interface AssociationCardProps {
  association: AssociationType;
}

const AssociationCard: FC<AssociationCardProps> = ({ association }) => {
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
        association.deleted_at && "opacity-15"
      }  bg-white gap-y-1 py-3 w-[260px] h-[260px] rounded-xl flex flex-col justify-start items-center`}
    >
      <Image
        src={`/Bitmap.png`}
        alt="assostaion"
        width="200"
        height="200"
        className="size-24 rounded-full mb-3"
      />
      <h4 className="font-semibold">{association.name}</h4>
      <div className="flex gap-x-2 items-center">
        <MapPin size={14} color="black" absoluteStrokeWidth />
        <p className="text-black">{association && association.city}</p>
      </div>
      <p>hello@yassine.info</p>
      <div className="w-auto px-2  h-7 border-2 rounded-md flex items-center justify-center gap-x-2">
        <Link href={`/associations/${association.id}`}>
          <FilePenLine size={20} />
        </Link>
        <div className="h-full w-[1px] bg-black/30"></div>

        <form action={onDelete}>
          <input hidden type="number" name="id" value={association.id} />
          <SubmitButton
            style="inline-block rounded text-blue-600  py-2 text-xs font-medium hover:text-blue-700  duration-150"
            title="delete"
            loadingForm="deleting"
          />
        </form>
      </div>
    </div>
  );
};
export default AssociationCard;