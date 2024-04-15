export interface PatienType {
  id: number;
  association_id: number;
  association: string;
  first_name: string;
  last_name: string;
  city: string;
  current_address: string;
  // birth_address: string;
  phone: string;
  avatar: string;
  status: "active" | "inactive" | "suspended" | "deleted" | "dead";
  date_of_birth: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResponsePatienData {
  data: PatienType[];
  total_pages: number;
  current_page: number;
}
