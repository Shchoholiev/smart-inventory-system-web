import { Role } from "./role.model";

export class User {
    public id: string = '';
    public name: string = '';
    public phone?: string;
    public email?: string;
    public groupId?: string;
    public roles: Role[] = [];
}