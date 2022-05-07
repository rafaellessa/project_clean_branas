import Coupon from '../src/Coupon'
import Item from '../src/Item'
import Order from '../src/Order'
describe('test', () => {
  it('Náo deve criar um pedido com um cpf inválido', () => {
    expect(() => new Order('111.111.111-11')).toThrow(new Error('Cpf inválido'))
  })
  it('Deve criar um pedido com 3 itens (com descrição, preço e quantidade)', () => {
    const order = new Order('304.686.390-04')
    order.addItems(new Item(1, 'Guitarra', 2000), 1)
    order.addItems(new Item(2, 'Amplificador', 4000), 1)
    order.addItems(new Item(3, 'Cabo', 30), 2)
    const total = order.getTotal()
    expect(total).toBe(6060)
  })

  it('Deve criar um pedido com cupom de desconto (percentual sobre o total do pedido)', () => {
    const order = new Order('304.686.390-04')
    order.addItems(new Item(1, 'Guitarra', 2000), 1)
    order.addItems(new Item(2, 'Amplificador', 4000), 1)
    order.addItems(new Item(3, 'Cabo', 30), 2)
    order.addCoupon(new Coupon('VALE20', 20))
    const total = order.getTotal()
    expect(total).toBe(4848)
  })
})
