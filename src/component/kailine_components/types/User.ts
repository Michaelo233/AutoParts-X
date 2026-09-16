export type UserRole = 'buyer' | 'seller' | 'both' | 'admin';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    password: string;
    role: UserRole;
}
