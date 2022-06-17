import Order from '../../../domain/entity/Order'
import OrderRepository from '../../../domain/repository/OrderRepository'
import { PrismaClient } from '@prisma/client'

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
}
