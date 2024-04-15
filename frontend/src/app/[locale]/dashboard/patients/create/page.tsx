import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import AssociationsForm from '@/components/Forms/AssociationsForm';
import PatientForms from '@/components/Forms/PatientForms';
import { getSession } from '@/lib/getSessions';
import { redirect } from 'next/navigation';


export default async function Page() {
  const session = await getSession();

  if(session.role === 1){
    redirect('/dashboard')
  }

  return (
    <div className="mt-4">
      <PatientForms  />
    </div>
  );
}
