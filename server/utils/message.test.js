const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    // store response in variable
    const text = 'my test message'
    const from = 'Test@testing.xcom'
    const message = generateMessage(from, text)
    // assert from match
    expect(message.text === text)
    expect(message.from === from)
    expect(typeof message.createdAt === 'number')
    // assert text marhc
    // assert createdAt is number
  })
})