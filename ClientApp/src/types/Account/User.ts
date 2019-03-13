import Role from "./Role";

export default class User {
    constructor(){
        this.id = '';
        this.name = '';
        this.roles = [];
    }

    id: string;
    name: string;
    roles: Role[]
}