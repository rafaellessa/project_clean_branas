import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import GetItems from '../../src/usecases/GetItems'

describe('test', () => {
  it('Deve buscar os items', async () => {
    const itemRepository = new ItemRepositoryMemory()
    itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
    itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
    itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))
    const getItems = new GetItems(itemRepository)
    const items = await getItems.execute()
    expect(items).toHaveLength(3)
  })
})
