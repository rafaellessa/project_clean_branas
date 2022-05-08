import Dimension from '../src/Dimension'
import GetItems from '../src/GetItems'
import Item from '../src/Item'
import ItemRepositoryMemory from '../src/ItemRepositoryMemory'
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
