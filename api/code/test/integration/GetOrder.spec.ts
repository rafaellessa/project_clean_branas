import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory'
import GetOrder from '../../src/usecases/GetOrder'
import PlaceOrder from '../../src/usecases/PlaceOrder'
describe('Get Order', () => {
  it('Deve retornar um pedido com base no código', async () => {
    const orderRepository = new OrderRepositoryMemory()
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const couponRepository = new CouponRepositoryMemory()
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const parsedOrder = {
      cpf: '903.542.750-54',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 2 }
      ]
    }
    const outputOrder = await placeOrder.execute(parsedOrder)
    const getOrder = new GetOrder(orderRepository)
    const order = await getOrder.execute(outputOrder.code)
    expect(order.code.value).toBe(outputOrder.code)
  })
})
