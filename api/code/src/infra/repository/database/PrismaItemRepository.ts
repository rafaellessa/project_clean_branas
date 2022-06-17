import Item from '../../../domain/entity/Item'
import ItemRepository from '../../../domain/repository/ItemRepository'
import { PrismaClient } from '@prisma/client'
import Dimension from '../../../domain/entity/Dimension'

export default class PrismaItemRepository implements ItemRepository {
  prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  async getItem (idItem: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: {
        id_item: idItem
      }
    })
    if (!item) throw new Error('item not found')
    return new Item(item.id_item, item.description, Number(item.price), new Dimension(item.width, item.height, item.length), item.weight)
  }

  save (item: Item): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async list (): Promise<Item[]> {
    const itemsDb = await this.prisma.item.findMany()
    const items: Item[] = []
    itemsDb.forEach((item) => {
      items.push(new Item(item.id_item, item.description, Number(item.price), new Dimension(item.width, item.height, item.length), item.weight))
    })
    return items
  }
}
