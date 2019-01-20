export interface UserCredentials {
    name?: string;
    email: string;
    password: string;
}

export interface TokenContent {
    _id: string;
    email: string;
    name: string;
    exp: number;
}
