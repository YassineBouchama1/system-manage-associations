'use client'
 
import { useFormStatus } from 'react-dom'
 
export function SubmitButton({ title  = 'submit'}: { title?:string }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? "loading.." : title}
    </button>
  );
}