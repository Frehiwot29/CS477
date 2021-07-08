class User {
    constructor(username, password, role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }
    login() {
        return users.find(p => p.username === this.username && p.password === this.password);
    }
}
const users = [new User('adonay', 'adu29', 'admin'),
new User('simon', 'sim23', 'user'),
new User('kalab', 'kal06', 'users')];

module.exports = User;
