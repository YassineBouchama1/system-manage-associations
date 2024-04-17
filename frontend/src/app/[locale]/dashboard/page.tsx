import CardStatus from "@/components/CardStatus";
import { fetchStatistics } from "@/actions/dashboard";
import { patientsCharts } from "@/actions/dashboard/patientsCharts";
import BarChart from "@/components/charts/patients/BarChart";
import PieChart from "@/components/charts/cities/PieChart";

const timeFrame = "last30days";

export default async function pageDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const combinedParams = {
    ...searchParams,
    timeFrame: searchParams.timeframe?.toString() || timeFrame.toString(),
  };

  const { success, error } = await fetchStatistics();
  const { success: chartData, error: errorChart } = await patientsCharts(
    combinedParams
  );
  if (error) {
    throw new Error(error.toString());
  }
  
  console.log("chart dashboard", chartData);
  return (
    <>
      <main className="h-full w-full ">
        <CardStatus itemCards={success} />

        <div className=" flex lg:flex-row  flex-col gap-2">
          {chartData ? <BarChart chartData={chartData} /> : <h3>error</h3>}
          {/* {chartData ? <PieChart chartData={chartData} /> : <h3>error</h3>} */}
        </div>
      </main>
    </>
  );
};

