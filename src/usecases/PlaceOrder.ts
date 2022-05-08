import ItemRepository from '../domain/repository/ItemRepository'
import Order from '../domain/entity/Order'
import OrderRepository from '../domain/repository/OrderRepository'

type PlaceOrderItem = {
  idItem: number
  quantity: number
}

type PlaceOrderDto = {
  cpf: string
  orderItems: PlaceOrderItem[]
  coupon?: string
}

type PlaceOrderResponse = {
  total: number
}

export default class PlaceOrder {
  constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {}

  async execute (params: PlaceOrderDto): Promise<PlaceOrderResponse> {
    const order = new Order(params.cpf)
    for (const orderItem of params.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItems(item, orderItem.quantity)
    }
    await this.orderRepository.save(order)
    const total = order.getTotal()
    return { total }
  }
}
