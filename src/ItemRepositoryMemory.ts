import Item from './Item'
import ItemRepository from './ItemRepository'
export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor () {
    this.items = []
  }

  async getItem (idItem: number): Promise<Item> {
    const item = this.items.find(item => item.id === idItem)
    if (!item) throw new Error('Item not found')
    return item
  }

  async save (item: Item):Promise<void> {
    Promise.resolve(this.items.push(item))
  }

  async list (): Promise<Item[]> {
    return this.items
  }
}
