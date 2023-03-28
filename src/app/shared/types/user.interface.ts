export interface User {
    id: number;
    username: string;
    password: string;
    token?: string;
    first_name: string;
    last_name: string;
    nbf: number;
    exp: number;
    iat: number;
    type: string;
}