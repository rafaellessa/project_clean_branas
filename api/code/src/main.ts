import Dimension from './domain/entity/Dimension'
import Item from './domain/entity/Item'
import GetItems from './usecases/GetItems'
import ExpressAdapter from './infra/http/ExpressAdapter'
import ItemRepositoryMemory from './infra/repository/memory/ItemRepositoryMemory'

const http = new ExpressAdapter()
const httpPort = process.env.CLEAN_API_PORT

const itemRepository = new ItemRepositoryMemory()
itemRepository.save(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3))
itemRepository.save(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20))
itemRepository.save(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1))

http.on('get', '/items', async (params: any, body: any) => {
  const getItems = new GetItems(itemRepository)
  const response = await getItems.execute()
  return response
})
http.listen(Number(httpPort) || 3001)
