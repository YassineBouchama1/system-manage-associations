import { fetchAssociationById } from '@/actions/associations/getById';
import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import AssociationsFormUpdate from '@/components/Forms/AssociationsFormUpdate';
import type { FC } from 'react';



export default async function Associations({
  params,
}: {
  params: { id: string | number };
}) {


  //fetch association by id
  const { success: associationData, error: errorAssociation } =
    await fetchAssociationById(params.id);

  //fetch list of illnesses
  const { success: illnessesData, error: errorIllnesses } =
    await fetchIllnessForSelectors();



  // handle errors  if fetching Failed
  if (errorAssociation) {
    throw new Error(errorAssociation.toString());
  }
  if (errorIllnesses) {
    throw new Error(errorIllnesses.toString());
  }
  return (
    <div className="mt-4">
      <AssociationsFormUpdate
        association={associationData}
        illnesses={illnessesData.data}
      />
    </div>
  );
};
