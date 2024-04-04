'use client'
 
import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({
  title = "submit",
  style,
  loadingForm = 'loading...',
}: {
  title?: string;
  style?: string;
  loadingForm?:any;
}) {
  const { pending } = useFormStatus();
//  const t = useTranslations("ui");
  return (
    <button type="submit" aria-disabled={pending} className={style}>
      {pending ? loadingForm : (title ? title : 'button')}
    </button>
  );
}