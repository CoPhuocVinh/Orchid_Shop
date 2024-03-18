
export enum UserRole {
    CUSTOMER = "CUSTOMER",
    ADMIN = "ADMIN",
    STAFF = "STAFF"
}

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export type IUser = {
     id: number,
     name: string,
     email: string,
     role: UserRole,
     dob: number,
     gender: Gender
}


export type IAdress = {
    address: string,
    phone: number,
    defaulted?: boolean,
    info_name?: string
}