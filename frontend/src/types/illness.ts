export  interface IllnessType {
  id: number;
  name: string;
  associations: number;
  deleted_at: null | string; 
  created_at: string;
  updated_at: string;
}



export interface ResponseIllnessType {
  data: IllnessType[];
  total_pages: number;
  current_page: number;
}