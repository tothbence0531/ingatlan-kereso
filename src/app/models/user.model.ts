export interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  created_at?: Date;
  lastLogin?: Date;
  savedProperties?: string[]; // TODO: implement savedProperties
  profilePicture?: string; // TODO: implement profilePicture
}
