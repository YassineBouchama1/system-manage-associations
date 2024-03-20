'use client'
import type { FC } from 'react';
import LocaleSwitcher from '../next-intl/LocaleSwitcher';
import { AlignJustify, Bell, Search } from 'lucide-react';
import ProfileIcon from './ProfileIcon';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { useGlobalTheme } from '@/hooks/useTheme';

interface HeaderProps {}

const Header: FC<HeaderProps> =   ({}) => {
    const { toggleSIdeBar, setToggleSIdeBar } = useGlobalTheme();

 const t =  useTranslations("header");
        return (
          <header className="bg-white shadow-lg border-gray-200 px-4 min-h-16 lg:px-6 py-2.5 dark:bg-gray-800 ">
            <nav className="flex  items-center justify-between ">
              <div className="flex items-center justify-start gap-4">
                <button onClick={() => setToggleSIdeBar(!toggleSIdeBar)}>
                  <AlignJustify />
                </button>
                <div className="hidden md:flex px-4 py-2 rounded-full  items-center justify-start gap-x-3 bg-[#F5F6FA] border-2 border-gray-500/20">
                  <Search className="rotate-90 text-gray-500" />
                  <input
                    className="bg-transparent focus:border-none focus:outline-none "
                    type="text"
                    placeholder={"بحث"}
                  ></input>
                </div>
              </div>

              <div className="flex gap-x-4 items-center">
                <Bell color="#4880FF" />
                {/* <LocaleSwitcher /> */}
                <ProfileIcon />
              </div>
            </nav>
          </header>
        ); 
}
export default Header;