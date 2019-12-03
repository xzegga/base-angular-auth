// user.ts
export interface LoginResponse {
    status: string;
    message: string;
    Authorization: string;
}

export class Profile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    dui?: string;
    bloodtype?: string;
    contacts?: Array<Contact>;
    health_insurance_type?: string;
    insurance_company?: string;
    insurance_policy?: string;
    birthdate?: string;
    password?: string;
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

