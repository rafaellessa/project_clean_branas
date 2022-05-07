import OrderItem from '../src/OrderItem'
describe('test', () => {
  it('Deve criar um item de pedido', () => {
    const orderItem = new OrderItem(1, 'Guitarra', 2000, 1)
    expect(orderItem.getTotal()).toBe(2000)
  })
})
