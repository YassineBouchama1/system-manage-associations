import { redirect } from "next/navigation";
import { changeName, changeRole } from "@/actions/profile";
import { delay } from "@/lib/delay";
import { getSession } from "@/lib/getSessions";
import LocaleSwitcher from "@/components/next-intl/LocaleSwitcher";
import CardStatus from "@/components/CardStatus";
import Association from "@/components/ui/AssociationCard";
import { fetchStatistics } from "@/actions/dashboard";
import LineChart from "@/components/charts/patients/LineChart";
import { patientsCharts } from "@/actions/dashboard/patientsCharts";
import BarChart from "@/components/charts/patients/BarChart";

const timeFrame = "last30days";

export default async function pageDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const combinedParams = {
    ...searchParams,
    timeFrame: searchParams.timeFrame?.toString() || timeFrame.toString(),
  };

  const { success, error } = await fetchStatistics();
  const { success: chartData, error: errorChart } = await patientsCharts(
    combinedParams
  );
  if (error) {
    throw new Error(error.toString());
  }

  return (
    <>
      <main className="h-full w-full ">
        <CardStatus itemCards={success} />

        <div className="hidden md:flex">
          {chartData ? <BarChart chartData={chartData} /> : <h3>error</h3>}
        </div>
      </main>
    </>
  );
};

