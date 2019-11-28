// user.ts
export interface LoginResponse {
    status: string,
    message: string,
    Authorization: string
}

export interface Profile{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    dui?: string;
    bloodtype?: string;
    contacts?: Array<Contact>;
    poliza?: string;
    date?: string;
}

export interface Register{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    dui?: string;
    bloodtype?: string;
    health_insurance_type?: string;
    insurance_company?: string;
    insurance_policy?: string;
    contacts?: Array<Contact>
}

export interface Contact {
    id: number;
    name: string;
    phone: number;
}

export class Invite {
    email: string;
    isAdmin: boolean;
}

export class Credentials {
    email: string;
    password: string;
}

