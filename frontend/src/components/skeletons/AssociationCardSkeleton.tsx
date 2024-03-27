import Image from "next/image";
import type { FC } from "react";



const AssociationCardSkeleton: FC = ({}) => {
  return (
    <div className="animate-pulse bg-white gap-y-2 py-3 w-[260px] h-[260px] rounded-xl flex flex-col justify-start items-center">
      <div className="size-24 rounded-full mb-3 bg-gray-300"></div>
      <div className="font-semibold bg-gray-300 w-7 h-3"> </div>
      <div className="flex gap-x-2 items-center">
        <div className="w-24 h-4 bg-gray-300"></div>
      </div>
      <p className="bg-gray-300 w-28 h-5"></p>
      <div className="bg-gray-300  px-2 w-16 h-8 border-2 rounded-md flex items-center justify-center gap-x-2">
        <div className="bg-gray-300  rounded-full"></div>

        <div className="bg-gray-300  rounded-full"></div>
      </div>
    </div>
  );
};
export default AssociationCardSkeleton;
