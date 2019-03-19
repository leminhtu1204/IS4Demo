import Role from "./Role";

export default class User {
    constructor(){
        this.id = '';
        this.userName = '';
        this.roles = [];
    }

    id: string;
    userName: string;
    roles: Role[]
}