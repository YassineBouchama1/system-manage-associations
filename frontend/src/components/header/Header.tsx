'use client'
import type { FC } from 'react';
import LocaleSwitcher from '../next-intl/LocaleSwitcher';
import { AlignJustify, Bell, Search } from 'lucide-react';
import ProfileIcon from './ProfileIcon';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { useGlobalTheme } from '@/hooks/useTheme';
import { useAppDispatch } from '@/redux/Hook';
import { toggleSidebar } from '@/redux/ThemeSlice';
import { SessionData } from '@/lib/optionsSessions';
import Image from 'next/image';

interface HeaderProps {
  session: SessionData
}

const Header: FC<HeaderProps> =   ({session}) => {

      const dispatch = useAppDispatch();

 const t =  useTranslations("header");
        return (
          <header className="bg-white shadow-lg border-gray-200 px-4 min-h-16 lg:px-6 py-2.5 dark:bg-gray-800 ">
            <nav className="flex  items-center justify-between ">
              <div className="flex items-center justify-start gap-4">
                <button
                  className="md:hidden"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <AlignJustify />
                </button>
                <div className="hidden lg:flex px-4 py-2 rounded-full  items-center justify-start gap-x-3 bg-[#F5F6FA] border-2 border-gray-500/20">
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
                <LocaleSwitcher />
                <div className="flex flex-row items-center gap-2 ">
                  <Image
                    className="w-10 h-10 rounded-full"
                    src={`/avatars/pf.png`}
                    alt={"lang"}
                    width="100"
                    height="100"
                  />

                  <div>
                    <p className="font-semibold">{session && session.name}</p>
                    <p className="text-xs">{session && session.roleName}</p>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        ); 
}
export default Header;