export interface AppUser {
  uid: string;
  name: {
    first: string;
    last: string;
  };
  email: string;
  role: 'buyer' | 'seller';
  listings?: string[]; // TODO: implement listings
  savedProperties?: string[]; // TODO: implement savedProperties
  appointments?: string[]; // TODO: implement appointments
  profilePicture?: string; // TODO: implement profilePicture
}
