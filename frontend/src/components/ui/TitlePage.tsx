'use client'
import { useTranslations } from 'next-intl';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import type { FC } from 'react';

interface TitlePageProps {title?:string}

const TitlePage: FC<TitlePageProps> = ({title}) => {
      const t = useTranslations("sideBar");

 const sugment = useSelectedLayoutSegment()

const pathname =usePathname()

 if (pathname.includes("create")) {
   return (
     <h2 className="uppercase font-medium text-xl py-2">
       {t('create')} {t(sugment)}
     </h2>
   );
 }
   return (
     <h2 className="uppercase font-medium text-xl py-2">
       {sugment ? t(sugment) : t("dashboard")}
     </h2>
   );
}
export default TitlePage;