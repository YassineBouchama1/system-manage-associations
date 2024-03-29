
export function TableSkeleton() {
  return (
    <section className=" grid  grid-cols-4 grid-rows-1  gap-6 ">
      <div className="animate-pulse h-24 col-span-4 md:col-span-2 lg:col-span-1 bg-white flex flex-row items-start justify-between w-full    rounded-xl py-2 px-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium opacity-80 w-7 h-4 bg-gray-300"></p>
          <p className="font-semibold text-lg w-7 h-4 bg-gray-300"></p>
        </div>
        <div className="rounded-[23px] p-4 bg-gray-300">
          <div className="size-5 bg-white"></div>
        </div>
      </div>

      {/* items  */}
      <div className="animate-pulse h-24 col-span-4 md:col-span-2 lg:col-span-1 bg-white flex flex-row items-start justify-between w-full    rounded-xl py-2 px-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium opacity-80 w-7 h-4 bg-gray-300"></p>
          <p className="font-semibold text-lg w-7 h-4 bg-gray-300"></p>
        </div>
        <div className="rounded-[23px] p-4 bg-gray-300">
          <div className="size-5 bg-white"></div>
        </div>
      </div>

      {/* items  */}
      <div className="animate-pulse h-24 col-span-4 md:col-span-2 lg:col-span-1 bg-white flex flex-row items-start justify-between w-full    rounded-xl py-2 px-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium opacity-80 w-7 h-4 bg-gray-300"></p>
          <p className="font-semibold text-lg w-7 h-4 bg-gray-300"></p>
        </div>
        <div className="rounded-[23px] p-4 bg-gray-300">
          <div className="size-5 bg-white"></div>
        </div>
      </div>

      {/* items  */}
      <div className="animate-pulse h-24 col-span-4 md:col-span-2 lg:col-span-1 bg-white flex flex-row items-start justify-between w-full    rounded-xl py-2 px-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium opacity-80 w-7 h-4 bg-gray-300"></p>
          <p className="font-semibold text-lg w-7 h-4 bg-gray-300"></p>
        </div>
        <div className="rounded-[23px] p-4 bg-gray-300">
          <div className="size-5 bg-white"></div>
        </div>
      </div>

      {/* items  */}
    </section>
  );
}
