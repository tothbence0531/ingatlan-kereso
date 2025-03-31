export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password_hashed?: string;
  savedProperties?: string[];
}
