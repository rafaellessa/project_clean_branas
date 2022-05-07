import Coupon from '../src/Coupon'
describe('test', () => {
  it('Deve calcular o desconto de um coupon', () => {
    const coupon = new Coupon('VALE30', 30, new Date())
    expect(coupon.calculateDiscount(1000)).toBe(300)
  })

  it('Deve criar um cupom expirado', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2022-05-01T10:00:00'))
    const isExpired = coupon.isExpired(new Date('2022-05-05T10:00:00'))
    expect(isExpired).toBeTruthy()
  })
})
