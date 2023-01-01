import { RoleModel } from "./role.model";

export class UserModel  {
    _id?: string;
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

    constructor( user: UserModel ) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.identityNum = user.identityNum;
        this.city = user.city;
        this.street = user.street;
        this.password = user.password;
    }
}
