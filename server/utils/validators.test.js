const expect = require('expect')
const { isRealString } = require('./validators')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    expect(isRealString(1))
      .toBeFalsy()
  })
  it('should reject string with only whitespace', () => {    
    expect(isRealString(''))
      .toBeFalsy()
    expect(isRealString('    '))
      .toBeFalsy()
  })
  it('should allow string with non-space characters', () => {    
    expect(isRealString('myRoom'))
      .toBeTruthy()
    expect(isRealString('my room'))
      .toBeTruthy()
    expect(isRealString('   my room   '))
      .toBeTruthy()
  })
})