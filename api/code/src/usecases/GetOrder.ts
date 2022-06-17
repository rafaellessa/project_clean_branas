import OrderRepository from '../domain/repository/OrderRepository'
import Order from '../domain/entity/Order'

export default class GetOrder {
  constructor (readonly orderRepository: OrderRepository) {
  }

  async execute (code: string): Promise<Order> {
    const order = await this.orderRepository.getOrder(code)
    if (!order) throw new Error('order not found')
    return order
  }
}
