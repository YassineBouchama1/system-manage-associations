import { logout } from '@/actions/profile';
import type { FC } from 'react';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
        return (<header className=' bg-slate-500 h-20 text-white'>
                <form action={logout}><input className='text-white' type='submit' value='logout'></input></form>
                 </header>);
}
export default Header;