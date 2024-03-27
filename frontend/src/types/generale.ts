export type ItemType = {
  title: string;
  data: string;
  icon: any;
  color: string;
  bgColor: string;
};



export interface Option {
  value: string; 
  label: string; 
  disabled?: boolean; 
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  options: Option[];
  defaultValue?: string;
}
