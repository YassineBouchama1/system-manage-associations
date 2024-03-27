'use client'
import { useTranslations } from 'next-intl';
import type { FC } from 'react';
import { Input } from '../ui/input';
import FormHeader from './FormHeader';

interface AssociationsFormProps {}

const AssociationsForm: FC<AssociationsFormProps> = ({}) => {
    const t = useTranslations('ui')
        return (
          <section className="bg-white rounded-md w-full min-h-screen px-2 md:px-20 py-6">
            <form className="w-auto">
           
              <FormHeader title={t("admin_Account")} />

              {/* start form  */}
              <div className="flex justify-start gap-8 mb-6">
                {/*  form item  */}
                <div className="flex flex-col">
                  <label htmlFor="role">{t("role")}</label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    placeholder={t("role")}
                  />
                </div>
                {/*  form item  */}
                <div className="flex flex-col">
                  <label htmlFor="email">{t("email")}</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("email")}
                  />
                </div>
                {/*  form item  */}

                <div className="flex flex-col">
                  <label htmlFor="password">{t("password")}</label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="************"
                  />
                </div>
                {/*  form item  */}
              </div>
              {/* end forms  */}
       
              <FormHeader title={t("association_Informations")} />
            </form>
          </section>
        );
}
export default AssociationsForm;