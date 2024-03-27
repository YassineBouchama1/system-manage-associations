import { cn } from "@/lib/utils";
import { SelectProps } from "@/types/generale";



const FormFieldSelect: React.FC<SelectProps> = ({
  title,
  options,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <label className="mr-1" htmlFor={rest.id}>
        {title}
      </label>
      <select
        {...rest}
        className={cn(
          "bg-theme-bodyInputs py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
        )}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormFieldSelect;
