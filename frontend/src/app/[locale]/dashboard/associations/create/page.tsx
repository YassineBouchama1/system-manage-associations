import AssociationsForm from '@/components/Forms/AssociationsForm';
import type { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
        return (
          <div className="mt-4">
            <AssociationsForm />
          </div>
        );
}
export default page;