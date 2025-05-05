export interface AppUser {
  uid: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  role: 'buyer' | 'seller';
  savedProperties?: string[]; // TODO: implement savedProperties
  appointments?: string[]; // TODO: implement appointments
  profilePicture?: string; // TODO: implement profilePicture
}
