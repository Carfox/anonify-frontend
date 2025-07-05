import { RoleInterface, RoleMinInformation } from "./role.interface"

export interface SimpleUserInfo{
    id:string
    name: string
}


export interface CreateUser{
    name: string,
    nationality: string,
    mail: string,
    username: string,
    password: string,
    cell_phone: string,
    role_id: string
}

export interface UserPublicInformation{
    id: string,
    name: string,
    nationality: string,
    mail: string,
    username: string,
    cell_phone: string,
    role: RoleInterface

}
export interface UserPublic{
    id: string,
    name: string,
    nationality: string,
    mail: string,
    username: string,
    cell_phone: string,
    role: RoleMinInformation

}


export interface UserMinInformation{
    id: string,
    name: string,
    username: string,
    role: RoleMinInformation
}