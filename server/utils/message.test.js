const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store response in variable
    const text = 'my test message'
    const from = 'tester'
    const message = generateMessage(from, text)
    // assert from match
    expect(message.text === text)
    expect(message.from === from)
    expect(typeof message.createdAt === 'number')
    // assert text marhc
    // assert createdAt is number
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    const latitude = 1
    const longitude = 2
    const from = 'tester'
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    const locationMessage = generateLocationMessage(from, latitude, longitude)

    expect(typeof locationMessage.createdAt === 'number')
    expect(locationMessage.from === from)
    expect(locationMessage.url === url)
  })
})