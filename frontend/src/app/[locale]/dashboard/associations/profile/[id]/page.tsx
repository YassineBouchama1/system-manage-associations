import { fetchAssociationById } from '@/actions/associations/getById';
import { fetchStatistics } from '@/actions/dashboard';
import { patientsCharts } from '@/actions/dashboard/patientsCharts';
import { fetchIllnessForSelectors } from '@/actions/illnesses/fetchIllnessForSelectors';
import CardStatus from '@/components/CardStatus';
import AssociationsFormUpdate from '@/components/Forms/AssociationsFormUpdate';
import SectionWrapper from '@/components/Wrappers/SectionWrapper';
import BarChartAssociation from '@/components/charts/association/BarChartAssociation';
import AssociationProfile from '@/components/ui/AssociationProfile';
import type { FC } from 'react';
//defuakt value for chart
const timeFrame = "last30days";


export default async function Associations({
  params,
  searchParams,
}: {
  params: { id: string | number; timeframe: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const combinedParams = {
    ...params,
    timeFrame: searchParams.timeFrame?.toString() || timeFrame.toString(),
  };

  //bring statistic data
  const { success, error } = await fetchStatistics(params.id);

  //fetch association by id
  const { success: associationData, error: errorAssociation } =
    await fetchAssociationById(params.id);

  const { success: chartData, error: errorChart } = await patientsCharts(
    combinedParams
  );



  // handle errors  if fetching Failed
  if (!associationData || errorAssociation) {
    throw new Error(errorAssociation.toString());
  }

  return (
    <main className="h-full w-full ">
      <CardStatus itemCards={success} />
      <div className="flex gap-4 flex-col lg:flex-row mt-6">
        <SectionWrapper styles="md:px-20 flex items-center flex-col gap-2">
          <AssociationProfile association={associationData} />
        </SectionWrapper>
        <SectionWrapper styles="md:px-6">
          <h2>charts</h2>
          <BarChartAssociation chartData={chartData} />
        </SectionWrapper>
      </div>
    </main>
  );
};
