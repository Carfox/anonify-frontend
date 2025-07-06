import { PermissionInterface } from "./permission.interface";

export interface RoleInterface{

    id: string,
    name: string,
    description: string,
    permissions: PermissionInterface[]
    
}

export interface RoleMinInformation{
    id: string
    name: string
}