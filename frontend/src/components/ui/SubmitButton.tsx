'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({
  title = "submit",
  style,
  loadingForm = 'loading...',
}: {
  title?: any;
  style?: string;
  loadingForm?:any;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className={style}>
      {pending ? loadingForm : title}
    </button>
  );
}