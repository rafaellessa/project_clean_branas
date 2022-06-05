import OrderCode from '../../src/domain/entity/OrderCode'

describe('OrderCode', () => {
  it('Deve gerar o codigo do pedido', () => {
    const orderCode = new OrderCode(new Date('2021-03-01T10:00:00'), 1)
    expect(orderCode.value).toBe('202100000001')
  })
})
