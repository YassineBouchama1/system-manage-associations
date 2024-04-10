import { fetchAssociationById } from '@/actions/associations/getById';
import AssociationsFormUpdate from '@/components/Forms/AssociationsFormUpdate';
import type { FC } from 'react';



export default async function Associations({
  params,
}: {
  params: { id: string | number };
}) {
  const { success, error } = await fetchAssociationById(params.id);
  console.log(success);

  if (error) {
    throw new Error(error.toString());
  }

  return (
    <div className="mt-4">
      <AssociationsFormUpdate association={success}/>
    </div>
  );
};
