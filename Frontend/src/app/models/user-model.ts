import { RoleModel } from "./role.model";

export class UserModel  {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    identityNum: string;
    city: string;
    street: string;
    password: string;
    userCartId?: string;
    roleId?: string;
    role?: RoleModel;
}
