class usersStorage {
    constructor() {
        this.storage = {}
        this.id = 0
    }
    addUser({ firstName, lastName, email, age, bio }) {
        const id = this.id
        this.storage[id] = { id, firstName, lastName, email, age, bio }
        this.id++;
    }
    getUser(id) {
        return this.storage[id]
    }
    getUsers() {
        return Object.values(this.storage)
    }
    updateUser(id, { firstName, lastName, email, age, bio }) {
        this.storage[id] = { id, firstName, lastName, email, age, bio }
    }
    deleteUser(id) {
        delete this.storage[id]
    }
    searchUser({ name, email }) {
        const users = Object.values(this.storage)
        return users.filter(item => item.email == email || item.firstName == name)
    }
}
module.exports = new usersStorage();