import Item from '../../../domain/entity/Item'
import ItemRepository from '../../../domain/repository/ItemRepository'
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

  async save (item: Item):Promise<Item> {
    const itemParsed = new Item(item.id, item.description, item.price, item.dimension, item.weight)
    this.items.push(itemParsed)
    return itemParsed
  }

  async list (): Promise<Item[]> {
    return this.items
  }
}
