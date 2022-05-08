import Dimension from '../src/Dimension'
import Item from '../src/Item'
import ItemRepositoryMemory from '../src/ItemRepositoryMemory'
import PlaceOrder from '../src/PlaceOrder'
import OrderRepositoryMemory from '../src/OrderRepositoryMemory'

describe('test', () => {
  it('Deve fazer um pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const placeOrder = new PlaceOrder(itemRepository, orderRepository)
    const parsedOrder = {
      cpf: '903.542.750-54',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 2 }
      ]
    }
    const order = await placeOrder.execute(parsedOrder)
    expect(order.total).toBe(6310)
  })
})
