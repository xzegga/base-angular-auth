// user.ts
export interface LoginResponse {
    status: string;
    message: string;
    Authorization: string;
}

export class Profile {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    dui?: string;
    bloodtype?: string;
    contacts?: Array<Contact>;
    health_insurance_type?: string;
    isActive?: boolean;
    insurance_company?: string;
    insurance_policy?: string;
    birthdate?: string;
    image?: any;
    password?: string;
    confirmPassword?: string;
    token?: string;
}


export class Contact {
    id?: number;
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

export function newUser(token: string, email: string): Profile {
    return {
        email: email,
        first_name: 'Alberto',
        last_name: 'Salinas',
        phone: '73332453',
        dui: '05796321-7',
        bloodtype: 'A+',
        contacts: [
            {
                name: 'Jose figueroa',
                phone: 78985545
            },
            {
                name: 'Carlos Escalante',
                phone: 452452452
            },
            {
                name: 'Rafael Segovia',
                phone: 70248565
            },
        ],
        health_insurance_type: 'string',
        insurance_company: 'string',
        insurance_policy: 'string',
        isActive: true,
        birthdate: '19-11-1998',
        password: 'string',
        token: token
    }
}


export class ResetPassword {
    new_password: string;
    password_confirm: string;
    token: string;
  }
