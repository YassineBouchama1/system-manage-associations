
import type { FC } from 'react';

interface FormHeaderProps {title:string}

const FormHeader: FC<FormHeaderProps> = ({title}) => {

        return (
          <>
            <h4 className="uppercase text-lg pt-8 pb-2 font-bold opacity-75">{title}</h4>
            <hr className="py-4" />
          </>
        );
}
export default FormHeader;