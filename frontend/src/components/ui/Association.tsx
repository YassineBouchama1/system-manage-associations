import { Ellipsis, FilePenLine, MapPin, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { FC } from 'react';
import { SubmitButton } from './SubmitButton';

interface AssociationProps {}

const Association: FC<AssociationProps> = ({}) => {
        return (
          <div className="bg-white gap-y-1 py-3 w-[260px] h-[270px] rounded-md flex flex-col justify-start items-center">
            <Image
              src={`/Bitmap.png`}
              alt="assostaion"
              width="200"
              height="200"
              className="size-24 rounded-full mb-3"
            />
            <h4>Name..</h4>
            <div className="flex gap-x-2 items-center">
              <MapPin size={14} color="black" absoluteStrokeWidth />
              <p>Safi</p>
            </div>
            <p>hello@yassine.info</p>
            <div className="w-auto px-2  h-7 border-2 rounded-md flex items-center justify-center gap-x-2">
              <FilePenLine size={20} />
              <div className="h-full w-[1px] bg-black/30"></div>
              <Trash2 color="red" size={20} />
              {/* <SubmitButton
                title={<Trash2 color="red" size={20} />}
                loadingForm={<Ellipsis size={20} className="animate-bounce" />}
              /> */}
            </div>
          </div>
        );
}
export default Association;