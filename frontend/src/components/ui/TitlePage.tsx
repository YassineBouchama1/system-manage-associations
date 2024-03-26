'use client'
import { useSelectedLayoutSegment } from 'next/navigation';
import type { FC } from 'react';

interface TitlePageProps {title:string}

const TitlePage: FC<TitlePageProps> = ({title}) => {
 
        return <h2 className="uppercase font-medium text-xl py-2">{title}</h2>;
}
export default TitlePage;