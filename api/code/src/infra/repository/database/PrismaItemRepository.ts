import { PrismaClient } from '@prisma/client'
import Dimension from '../../../domain/entity/Dimension'
import Item from '../../../domain/entity/Item'
import ItemRepository from '../../../domain/repository/ItemRepository'

export default class PrismaItemRepository implements ItemRepository {
  constructor (private readonly prisma: PrismaClient) {
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

  async save (item: Item): Promise<Item> {
    if (!item.dimension || !item.weight) throw new Error('Dimensions not found')
    const itemDb = await this.prisma.item.create({
      data: {
        description: item.description,
        category: '',
        price: item.price,
        width: item.dimension?.width,
        height: item.dimension?.height,
        weight: item.weight,
        length: item.dimension.length
      },
      select: {
        id_item: true
      }
    })

    return new Item(itemDb.id_item, item.description, item.price, new Dimension(item.dimension.width, item.dimension.height, item.dimension.length), item.weight)
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
