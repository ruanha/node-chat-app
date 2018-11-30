[{
  id: '',
  name: '',
  room: '',
}]

class Users {
  constructor() {
    this.users = []
  }
  addUser (id, name, room) {
    let user = { id, name, room }
    this.users.push(user)
    return user
  }
  removeUser(id) {
    // return removed user
    const removeUser = this.getUser(id)
    if (removeUser) {
      this.users = this.users.filter(user => user.id !== id)
    }
    return removeUser
  }
  getUser(id) {
    // return user
    return this.users.filter(user => user.id === id)[0]
  }
  getUserList(room) {
    // return array of user names
    const users = this.users.filter((user) => user.room === room)
    const namesArray = users.map((user) => user.name)

    return namesArray
  }
}

module.exports = { Users }