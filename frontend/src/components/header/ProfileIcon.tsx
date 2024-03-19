import Image from 'next/image';
import type { FC } from 'react';

interface ProfileIconProps {}

const ProfileIcon: FC<ProfileIconProps> = ({}) => {
        return (
          <div className='flex flex-row items-center gap-2 '>
            <Image 
            className='w-10 h-10 rounded-full'
            src={`/avatars/pf.png`} 
            alt={"lang"} width='100' height='100' />

            <div>
              <p className='font-semibold'>Yassine</p>
              <p className='text-xs'>admin</p>
            </div>
          </div>
        );
}
export default ProfileIcon;