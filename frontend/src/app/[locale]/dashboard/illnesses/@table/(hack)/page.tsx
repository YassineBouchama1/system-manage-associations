import HeaderTable from "@/components/Table/HeaderTable";
import ReusableTable from "@/components/Table/ReusableTable";
import SectionWrapper from "@/components/Wrappers/SectionWrapper";
import { delay } from "@/lib/delay";
import { setTimeout } from "timers";

export default async function Home() {
    await delay(4000);

const columns: string[] = ["id", "customer", "purchaseDate", "title"];
interface TableData {
  id?: number;
  customer?: string;
  purchaseDate?: string;
  title?: string;
}

  // Dummy data for table body (replace with your actual data fetching logic)
const data: TableData[] = [
  {
    id: 1,
    customer: "John Doe",
    purchaseDate: "2024-03-29",
    title: "Product A",
  },
  {
    id: 2,
    customer: "Jane Smith",
    purchaseDate: "2024-03-28",
    title: "Product B",
  },
  {
    id: 3,
    customer: "Michael Brown",
    purchaseDate: "2024-03-27",
    title: "Service X",
  },
  // ... add more dummy data entries
];

  return <ReusableTable columns={columns} data={data} />;
}
  