"use client";
import { createTimeLIneAction } from "@/actions/timeLine/createTimeLIneAction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { SubmitButton } from "./SubmitButton";
import { fetchTimeLines } from "@/actions/timeLine";
import { TimeLineType } from "@/types/timeLine";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TimeLineProps {}

const TimeLine: FC<TimeLineProps> = () => {
  const [timeLInesData, setTimeLinesData] = useState<TimeLineType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // ref linked with from
  const fromRef = useRef<HTMLFormElement>(null);

  const params = useParams();


  const fetchEntries = async () => {
    setIsLoading(true);
    const { success, error } = await fetchTimeLines(params.id as string);
    setIsLoading(false);
    if (success) {
      setTimeLinesData(success);
    } else {
      toast.error("Error fetching timelines:", error);
    }
  };



  useEffect(() => {
    fetchEntries();
  }, [params.id]); // re loaidng if id changed





  //createing card useing server action
  async function onCreateTimeLIne(formData: FormData) {
    const currentScrollPosition = window.scrollY;
    window.scrollTo(0, currentScrollPosition); // stop scroll to the top

    const result: any = await createTimeLIneAction(
      formData,
      params.id as string // id of patient want create timeline for it
    );



    if (result.success) {
      toast.success("Added New Illness Successfully ");
      fromRef.current?.reset();
      await fetchEntries(); // refetch items again
      return;
    }

    if (result?.error) {
      // handle erros from api
      toast.error(result?.error);
      return;
    }


    //handle zod errors
    else if (result?.errorZod) {
      Object.keys(result.errorZod).forEach((key: string) => {
        toast.error(`${key} ${result.errorZod[key]}`);
      });
      return;

    } else {
      toast.success(" unspected error");
      return;
    }
  }

  return (
    <div className="w-full md:min-w-[700px]   h-[450px] p-4 overflow-x-auto ">
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
        {timeLInesData.map((item: TimeLineType, index) => (
          <div
            key={item.id}
            className="w-full relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
              >
                <path d="M12 10v2H7V8.496a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V12H0V4.496a.5.5 0 0 1 .206-.4l5.5-4a.5.5 0 0 1 .588 0l5.5 4a.5.5 0 0 1 .206.4V10Z" />
              </svg>
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold text-slate-900 w-full">
                  {item.responsible}
                  {/* <span className="text-xs font-light text-gray-400 ml-2">
                    opened the request
                  </span> */}
                </div>
                <time
                  className={`${
                    index === 0 ? "text-amber-500" : "text-indigo-500"
                  } font-caveat font-medium w-full`}
                >
                  {item.time}
                </time>
              </div>

              <div className="text-slate-500">{item.description}</div>
              {item.file && (
                <Link
                  target="_blank"
                  href={item && item.file}
                  download
                  className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                  </svg>{" "}
                  Download FILE
                </Link>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="text-center">Loading...</div>}
      </div>
      {/* form create new timeline  */}

      <form
        ref={fromRef}
        action={onCreateTimeLIne}
        className="relative  w-full mt-6  "
      >
        <hr className="my-8 "></hr>
        <div className="relative w-full min-w-[200px]">
          <textarea
            rows={8}
            name="description"
            className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Your Comment <span className="text-red-500">*</span>
          </label>
        </div>
        <div className="flex w-full  flex-col md:flex-row items-center justify-between py-1.5 gap-4">
          <input
            type="file"
            name="file"
            className="w-full mx-2  md:w-1/2 text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />

          <div className="flex gap-2">
            <SubmitButton
              title="create"
              loadingForm={"creating..."}
              style="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            />
          </div>
        </div>
      </form>

      {/* form create new timeline  */}
    </div>
  );
};
export default TimeLine;
