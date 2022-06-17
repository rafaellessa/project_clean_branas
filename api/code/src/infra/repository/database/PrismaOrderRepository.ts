import { PrismaClient } from '@prisma/client'
import Dimension from '../../../domain/entity/Dimension'
import Item from '../../../domain/entity/Item'
import Order from '../../../domain/entity/Order'
import OrderRepository from '../../../domain/repository/OrderRepository'

export default class PrismaOrderRepository implements OrderRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  async save (order: Order): Promise<void> {
    const orderDb = await this.prisma.order.create({
      data: {
        code: order.code.value,
        cpf: order.cpf.value,
        issue_date: order.date,
        freight: order.getFreight(),
        sequence: order.sequence,
        total: order.getTotal(),
        coupon_code: order.coupon?.code,
        coupon_percentage: Number(order.coupon?.percentage)
      },
      select: {
        id_order: true
      }
    })

    for (const item of order.orderItems) {
      await this.prisma.orderItem.create({
        data: {
          id_item: item.idItem,
          id_order: orderDb.id_order,
          price: item.price,
          quantity: item.quantity
        }
      })
    }
  }

  async count (): Promise<number> {
    return await this.prisma.order.count()
  }

  async getOrder (code: string): Promise<Order | undefined> {
    const orderDb = await this.prisma.order.findFirst({
      where: {
        code
      }
    })

    if (orderDb) {
      const order = new Order(orderDb.cpf, new Date(orderDb.issue_date), orderDb.sequence)
      const orderItemsDb = await this.prisma.orderItem.findMany({
        where: {
          id_order: orderDb.id_order
        }
      })
      for (const orderItem of orderItemsDb) {
        const itemDb = await this.prisma.item.findUnique({
          where: {
            id_item: orderItem.id_item
          }
        })
        if (itemDb) {
          const item = new Item(itemDb.id_item, itemDb.description, Number(itemDb.price), new Dimension(itemDb?.width, itemDb?.height, itemDb?.length), itemDb.weight)
          order.addItems(item, orderItem.quantity)
        }
      }

      return order
    }
  }
}
