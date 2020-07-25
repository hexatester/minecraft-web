/* eslint-env jest */
const MinecraftWeb = require('../index')
describe('MinecraftWeb', () => {
  const PASSWORD = 'test'
  const mcw = new MinecraftWeb(PASSWORD)
  test('test password class', () => {
    expect(mcw.password).toBe(PASSWORD)
  })
  mcw.stop()
})
