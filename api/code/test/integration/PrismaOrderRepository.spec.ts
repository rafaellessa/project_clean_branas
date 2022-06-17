import { PrismaClient } from '@prisma/client'
import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import PrismaCouponRepository from '../../src/infra/repository/database/PrismaCouponRepository'
import PrismaItemRepository from '../../src/infra/repository/database/PrismaItemRepository'
import PrismaOrderRepository from '../../src/infra/repository/database/PrismaOrderRepository'
import GetOrder from '../../src/usecases/GetOrder'
import PlaceOrder from '../../src/usecases/PlaceOrder'
describe('PrismaOrderRepository', () => {
  let prisma: PrismaClient
  beforeAll(() => {
    prisma = new PrismaClient()
  })

  beforeEach(async () => {
    await prisma.order.deleteMany({})
    await prisma.orderItem.deleteMany({})
    await prisma.item.deleteMany({})
    await prisma.coupon.deleteMany({})
  })
  it('Deve retornar um pedido com base no código', async () => {
    const prismaOrderRepository = new PrismaOrderRepository(prisma)
    const orderRepository = new PrismaOrderRepository(prisma)
    const itemRepository = new PrismaItemRepository(prisma)
    const guitarItem = await itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    const amplifierItem = await itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    const cableItem = await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const couponRepository = new PrismaCouponRepository(prisma)
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const parsedOrder = {
      cpf: '903.542.750-54',
      orderItems: [
        { idItem: guitarItem.id, quantity: 1 },
        { idItem: amplifierItem.id, quantity: 1 },
        { idItem: cableItem.id, quantity: 2 }
      ],
      date: new Date('2021-03-01T10:00:00')
    }
    const outputOrder = await placeOrder.execute(parsedOrder)
    const getOrder = new GetOrder(prismaOrderRepository)
    const order = await getOrder.execute(outputOrder.code)
    expect(order.code.value).toBe(outputOrder.code)
  })

  it('Deve fazer um pedido e gerar um codigo para o pedido', async () => {
    const orderRepository = new PrismaOrderRepository(prisma)
    const itemRepository = new PrismaItemRepository(prisma)
    const guitarItem = await itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    const amplifierItem = await itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    const cableItem = await itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const couponRepository = new PrismaCouponRepository(prisma)
    const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository)
    const parsedOrder = {
      cpf: '903.542.750-54',
      orderItems: [
        { idItem: guitarItem.id, quantity: 1 },
        { idItem: amplifierItem.id, quantity: 1 },
        { idItem: cableItem.id, quantity: 2 }
      ],
      date: new Date('2021-03-01T10:00:00')
    }
    const order = await placeOrder.execute(parsedOrder)
    expect(order.code).toBe('202100000001')
  })
})
