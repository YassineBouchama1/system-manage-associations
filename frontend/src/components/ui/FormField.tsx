import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function FormField({ ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.title}</label>
      <input
        onChange={(e) => e.currentTarget.setCustomValidity("")}
        {...props}
        className={cn(
          "bg-theme-bodyInputs py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        )}
      />
    </div>
  );
}
