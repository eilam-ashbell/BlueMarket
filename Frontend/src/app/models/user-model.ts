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

    constructor( firstName: string, lastName: string, email: string, identityNum: string, city: string, street: string, password: string ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.identityNum = identityNum;
        this.city = city;
        this.street = street;
        this.password = password;
    }
}
