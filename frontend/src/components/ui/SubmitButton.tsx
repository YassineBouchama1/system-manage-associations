'use client'
 
import { cn } from '@/lib/utils';
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
    <button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className={cn(style,'hover:opacity-90 duration-200 scale-105')}
      style={{ opacity: pending ? "50%" : "100%" }}
    >
      {pending ? loadingForm : title ? title : "button"}
    </button>
  );
}