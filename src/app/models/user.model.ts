export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  salt?: string; // TODO: implement salt
  password_hashed: string; // TODO: change to bcrypt
  created_at?: Date;
  lastLogin?: Date;
  savedProperties?: string[]; // TODO: implement savedProperties
  profilePicture?: string; // TODO: implement profilePicture
}
