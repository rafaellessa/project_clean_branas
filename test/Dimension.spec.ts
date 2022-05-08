import Dimension from '../src/Dimension'

describe('test', () => {
  it('Deve criar as dimensões', () => {
    const dimension = new Dimension(100, 30, 10)
    const volume = dimension.getVolume()
    expect(volume).toBe(0.03)
  })
})
