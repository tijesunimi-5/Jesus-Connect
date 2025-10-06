export interface ClientUser {
  id: string | number;
  name?: string;
  email: string;
  role: string;
  confirmed?: boolean;
  logged?: boolean;
  title?: string;
  category?: string | string[];
  active?: boolean;
  denomination?: string;
  secret?: number | string
}