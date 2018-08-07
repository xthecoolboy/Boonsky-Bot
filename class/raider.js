const Network  = require("./network");
class Raider
{
    constructor()
    {
        let server = undefined;
        let role = undefined;
        let roleName = Raider.name;

        this.server = server;
        this.role = role;
        this.roleName = roleName;
    }
    MemberCompare(MemberB, listA, roleName)
    {
        const obj = new Network();
        roleName = this.roleName;
        obj.MemberCompare(MemberB, listA, roleName);
    }
    findRoleOn()
    {
        this.role = this.server.roles.find("name", this.roleName);
    }
    createRole() { 
        this.server.createRole({ name: this.roleName, color: '#e4b400'});
    }
}

module.exports = Raider;