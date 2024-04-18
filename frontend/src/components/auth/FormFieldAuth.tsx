import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

export function FormFieldAuth({ ...props }: InputProps) {
  return (
    <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      <label className="mr-1 mb-2" htmlFor={props.id}>
        {props.title}
      </label>
      <input
        onChange={(e) => e.currentTarget.setCustomValidity("")}
        {...props}
        className={cn(
          props.style,
          "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        )}
      />
    </div>
  );
}
