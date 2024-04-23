import { fetchPatientsForXlsx } from '@/actions/xlsx/patientsAction';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { GetExportXlsx } from '@/lib/GetExportXlsx';
import { getFormattedDateNow } from '@/lib/getFormattedDateNow';
import { ChevronDown, Filter } from 'lucide-react';
import { useState, type FC } from 'react';
import toast from 'react-hot-toast';

interface ExporterProps {}

const ExporterXlsx: FC<ExporterProps> = ({}) => {
  const [toggleFilter, setToggleFilter] = useState<boolean>(true);
  const [toggleColumns, setToggleColumns] = useState<boolean>(true);
  const [checkedDeleted, setCheckedDeleted] = useState<boolean>(false);
 const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
const columns: { key: string; value: string }[] = [
  { key: "id", value: "reference" },
  { key: "city", value: "city" },
  { key: "phone", value: "phone" },
  { key: "association", value: "association" },
  { key: "first_name", value: "first name" },
  { key: "last_name", value: "last name" },
  { key: "avatar", value: "image" },
  { key: "illness", value: "illness" },
  { key: "date_of_birth", value: "birthday" },
  { key: "status", value: "birthday" },
  { key: "current_address", value: "address" },
  { key: "created_at", value: "join at" },
];


const fetchDataToExport = async (formData: FormData) => {
//shrink all inputs
setToggleColumns(false)
setToggleFilter(false)

  //join all columns 
formData.append("columns", selectedColumns.join(",")); 

  const {
    error: apiError,
    success,
  } = await fetchPatientsForXlsx(formData);


  //after susccessfully fetch data export it  as xlsx
  if (success) {
    await GetExportXlsx("patients", "PatientExport", success);
    toast.success("Exported Successfully ");
    return
  }

  // handle erros from api
  if (apiError) {
    toast.error(apiError);
    return;
  } else {
        toast.error("An error occurred during export. Please try again.");
    return;
  }
};


// this function works when check all columns
// it's uncheck other columns and keep only all column
// const selectAllColumns = (isChecked: boolean) => {
//   if (isChecked) {
//     const allCheckboxes = document.querySelectorAll<HTMLInputElement>(
//       "#filterDropdown input[type='checkbox']:not(#all)"
//     );

//     allCheckboxes.forEach((checkbox) => {
//       checkbox.checked = false;
//     });
//   }
// };

  const handleSelectAll = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
 setSelectedColumns(columns.map((column) => column.key));  // select all columns
    } else {
      setSelectedColumns([]); // deselect all columns
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedColumns([...selectedColumns, value]); 
    } else {
      setSelectedColumns(selectedColumns.filter((column) => column !== value)); // Remove column from selection
    }
  };

  return (
    <form action={fetchDataToExport}>
      <h2 className="text-stone-700 text-xl font-bold">Export Data Patients</h2>
      <p className="mt-1 text-sm">
        Use filters to further Which Data Want Export{" "}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col relative">
            <label
              htmlFor="name"
              className="text-stone-600 text-sm font-medium"
            >
              Status
            </label>
            <button
              className={` mt-2  w-full md:w-auto flex items-center justify-center py-3 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
              type="button"
              onClick={() => setToggleFilter(!toggleFilter)}
            >
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              Filter
              <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
            </button>
            <div
              id="filterDropdown"
              className={`${
                toggleFilter && "hidden"
              }  scale-y-100 z-10 absolute top-16 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Choose Filters
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="filterDropdownButton"
              >
                <li className="flex items-center">
                  <input
                    id="deleted"
                    type="checkbox"
                    value="true"
                    name="deleted"
                    checked={!!checkedDeleted}
                    onChange={(e) => setCheckedDeleted(e.target.checked)}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="deleted"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    Deleted
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-2 "></div>

          <div className="flex flex-col relative">
            <label
              htmlFor="name"
              className="text-stone-600 text-sm font-medium"
            >
              Columns
            </label>
            <button
              className={` mt-2  w-full md:w-auto flex items-center justify-center  py-3 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
              type="button"
              onClick={() => setToggleColumns(!toggleColumns)}
            >
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              Select
              <ChevronDown className="h-4 w-4 mr-2 text-gray-400" />
            </button>
            <div
              id="filterDropdown"
              className={`${
                toggleColumns && "hidden"
              }  scale-y-100 z-10 absolute top-16 w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700`}
            >
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Choose Filters
              </h6>
              <ul
                className="space-y-2 text-sm"
                aria-labelledby="filterDropdownButton"
              >
                <li className="flex items-center">
                  <label
                    htmlFor="all"
                    className=" text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    <input
                      id="all"
                      type="checkbox"
                      value="all"
                      name="all"
                      onChange={handleSelectAll}
                      className="mr-2 w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    All
                  </label>
                </li>
                {/* destract a columns  */}
                {columns.map((column) => (
                  <li key={column.key} className="flex items-center">
                    <label className=" text-sm font-medium text-gray-900 dark:text-gray-100">
                      <input
                        type="checkbox"
                        value={column.key}
                        className="mr-2 w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onChange={handleCheckboxChange}
                        checked={selectedColumns.includes(column.key)}
                      />
                      {column.value}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-stone-600 text-sm font-medium">
            Created Between
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              id="date"
              name="startDate"
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <ChevronDown className="self-center h-4 w-4 mr-2 text-center text-gray-400" />

            <input
              type="date"
              id="date"
              name="endDate"
              defaultValue={getFormattedDateNow()}
              max={getFormattedDateNow()}
              className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="date" className="text-stone-600 text-sm font-medium">
            Birth Between
          </label>
          <input
            type="date"
            id="date"
            name="birth"
            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="status"
            className="text-stone-600 text-sm font-medium"
          >
            Numbers of Patients
          </label>

          <input
            name="per_page"
            type="number"
            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></input>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
        <SubmitButton
          title="Export"
          style="active:scale-95 rounded-lg bg-theme-color hover:bg-primary-700 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
        />
      </div>
    </form>
  );
};
export default ExporterXlsx;