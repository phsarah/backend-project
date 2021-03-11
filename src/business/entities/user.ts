export class User {
    constructor(
       public readonly id: string,
       public readonly name: string,
       public readonly email: string,
       public readonly nickname: string,
       public readonly password: string,
       public readonly role: string
    ) { }
}

export interface AuthenticationData {
    id: string;
    role?: string;
}

export interface userInputDTO{
    name: string,
    email: string,
    nickname: string,
    password: string 
}
export interface userOutputDTO{
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string 
    role: string
}


export interface loginInputDTO{
    emailOrNickname: string,
    password: string
}