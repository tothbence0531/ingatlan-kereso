export interface AppUser {
  uid: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  role: 'buyer' | 'seller';
  listings?: string[];
  savedProperties?: string[];
  appointments?: string[];
  profilePicture?: string;
}
