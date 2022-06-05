import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory'
import PlaceOrder from '../../src/usecases/PlaceOrder'
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory'
import Coupon from '../../src/domain/entity/Coupon'

describe('test', () => {
  it('Deve fazer um pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
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
    const order = await placeOrder.execute(parsedOrder)
    expect(order.total).toBe(6310)
  })

  it('Deve fazer um pedido e gerar um codigo para o pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
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
      ],
      date: new Date('2021-03-01T10:00:00')
    }
    const order = await placeOrder.execute(parsedOrder)
    expect(order.code).toBe('202100000001')
  })

  it('Deve fazer um pedido com desconto', async () => {
    const itemRepository = new ItemRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const couponRepository = new CouponRepositoryMemory()
    couponRepository.save(new Coupon('VALE20', 20))
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const parsedOrder = {
      cpf: '903.542.750-54',
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 2 }
      ],
      date: new Date('2021-03-01T10:00:00'),
      coupon: 'VALE20'
    }
    const order = await placeOrder.execute(parsedOrder)
    expect(order.total).toBe(5098)
  })
})
