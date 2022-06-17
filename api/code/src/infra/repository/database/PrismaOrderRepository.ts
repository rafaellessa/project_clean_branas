import Order from '../../../domain/entity/Order'
import OrderRepository from '../../../domain/repository/OrderRepository'
import { PrismaClient } from '@prisma/client'

export default class PrismaOrderRepository implements OrderRepository {
  prisma: PrismaClient
  constructor () {
    this.prisma = new PrismaClient()
  }

  save (order: Order): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async count (): Promise<number> {
    return await this.prisma.order.count()
  }
}
