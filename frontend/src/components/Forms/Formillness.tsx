'use client'
import { useState, type FC } from 'react';
import { useTranslations } from 'next-intl';
import UploaderImg from '../ui/UploaderImg';
import { FormField } from './FormField';
import { SubmitButton } from '../ui/SubmitButton';
import Modal from '../Modal';

interface FormillnessProps {}

const Formillness: FC<FormillnessProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('ui')




    
        return (
          <form className="flex w-auto  flex-col items-start  gap-2  items-center  ">
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>holdodl</Modal>

            {/* <UploaderImg name="logo" text={t("upload_ThPhoto")} /> */}
            <FormField
              id="name"
              name="name"
              type="text"
              placeholder={t("name")}
              title={t("name")}
            />
            <div className="w-full my-6 flex justify-center">
              <SubmitButton
                title={t("create")}
                style='bg-theme-color w-52 px-2 py-3 rounded-md text-white text-end"'
              />
            </div>
          </form>
        );
}
export default Formillness;