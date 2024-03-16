'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({
  title = "submit",
  style,
}: {
  title?: string;
  style?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending} className={style}>
      {pending ? "loading.." : title}
    </button>
  );
}