export type ItemType = {
  title: string;
  data: string;
  icon: any;
  color: string;
  bgColor: string;
};



export interface Option {
  value: string; 
  name: string; 
  disabled?: boolean; 
}


// selector
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title: string;
  name: string;
  options: any[];

  defaultValue?: string;
}
