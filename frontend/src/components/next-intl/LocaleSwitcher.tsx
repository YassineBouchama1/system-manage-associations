import {useLocale, useTranslations} from 'next-intl';
import {locales} from '../../config';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import Image from 'next/image';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
//this is a selector for change language
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {t(lang)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
