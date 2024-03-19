import { logout } from '@/actions/profile';
import type { FC } from 'react';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
        return (
          <header className='bg-white border-gray-200 px-4 min-h-16 lg:px-6 py-2.5 dark:bg-gray-800'>
            <nav></nav>
          </header>
        );
}
export default Header;