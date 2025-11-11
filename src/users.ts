export interface User{
    id: number;
    name: string;
    email: string;
    passwordHash: string;
}

// it will hold the "registered users"
export const users: User[] = []