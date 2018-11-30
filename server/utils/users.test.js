const expect = require('expect')

const { Users } = require('./users')



describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'TestBoy',
      room: 'Red',
    }, {
      id: '2',
      name: 'TestGirl',
      room: 'Blue',      
    }, {
      id: '3',
      name: 'TestGenderNeutral',
      room: 'Red',
    }]
  })

  it('shoud add new user', () => {
    let users = new Users()
    let user = {
      id: '123',
      name: 'Rune',
      room: 'Test Room',
    }
    const resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users)
      .toEqual([user])
  })

  it('should remove a user', () => {
    expect(users.removeUser('1'))
      .toEqual({
      id: '1',
      name: 'TestBoy',
      room: 'Red',
    })
    expect(users.users.length)
      .toEqual(2)
  })

  it('should not remove user', () => {
    expect(users.removeUser('100'))
      .toEqual(undefined)
    expect(users.users.length)
      .toEqual(3)
  })

  it('should find user', () => {
    expect(users.getUser('1'))
      .toEqual(users.users[0])
  })

  it('should not find user', () => {
    expect(users.getUser('100'))
      .toEqual(undefined)
  })

  it('should return names for room Red', () => {
    const userList = users.getUserList('Red')

    expect(userList)
      .toEqual(['TestBoy', 'TestGenderNeutral'])
  })

  it('should return names for room Blue', () => {
    const userList = users.getUserList('Blue')

    expect(userList)
      .toEqual(['TestGirl'])
  })
})