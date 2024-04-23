export interface AssociationType {
  id: number;
  name: string;
  address: string;
  logo: string;
  city: string;
  illness_id: number;
  email?: string;
  illness: string;
  phone?: string;
  status: "active" | "inactive" | "suspended" | "deleted";
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResponseAssociationData {
  data: AssociationType[];
  total_pages: number;
  current_page: number;
}
