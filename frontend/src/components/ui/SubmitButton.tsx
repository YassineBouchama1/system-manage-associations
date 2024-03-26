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
  // const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={true} className={style}>
      {true ? loadingForm : title}
    </button>
  );
}