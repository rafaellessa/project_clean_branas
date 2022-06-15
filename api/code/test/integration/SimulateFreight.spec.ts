import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import SimulateFreight from '../../src/usecases/SimulateFreight'
describe('SimulateFreight', () => {
  it('Deve simular um frete do pedido', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const simulateFreight = new SimulateFreight(itemRepository)
    const input = {
      orderItems: [
        {
          idItem: 1, quantity: 1
        },
        {
          idItem: 2, quantity: 1
        },
        {
          idItem: 3, quantity: 3
        }
      ]
    }
    const output = await simulateFreight.execute(input)
    expect(output.total).toBe(260)
  })
})
