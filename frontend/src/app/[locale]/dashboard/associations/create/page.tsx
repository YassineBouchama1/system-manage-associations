import { fetchSelectors } from '@/actions/fetchFiltersSelectors/fetchSelectors';
import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import AssociationsForm from '@/components/Forms/AssociationsForm';


export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //fetch list of illnesses
  const { success, error } = await fetchSelectors();


  if (!success || error) {
    throw new Error(error.toString());
  }

  return (
    <div className="mt-4">
      <AssociationsForm illnesses={success.illnesses} />
    </div>
  );
}
