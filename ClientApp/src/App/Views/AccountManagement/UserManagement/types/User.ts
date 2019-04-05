import Role from "./Role";

export default class User {
    constructor(){
        this.id = '';
        this.userName = '';
        this.roles = [];
        this.phoneNumber = '',
        this.address = '',
        this.roleNames = [],
        this.email = ''
    }

    id: string;
    userName: string;
    roles: Role[];
    phoneNumber: string;
    address: string;
    roleNames:string[];
    email:string;
}