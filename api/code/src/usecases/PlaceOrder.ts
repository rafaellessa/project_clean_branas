import ItemRepository from '../domain/repository/ItemRepository'
import Order from '../domain/entity/Order'
import OrderRepository from '../domain/repository/OrderRepository'
import CouponRepository from '../domain/repository/CouponRepository'

type PlaceOrderItem = {
  idItem: number
  quantity: number
}

type PlaceOrderDto = {
  cpf: string
  orderItems: PlaceOrderItem[]
  coupon?: string
  date?: Date
}

type PlaceOrderResponse = {
  total: number
  code: string
}

export default class PlaceOrder {
  constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {}

  async execute (params: PlaceOrderDto): Promise<PlaceOrderResponse> {
    const sequence = await this.orderRepository.count() + 1
    const order = new Order(params.cpf, params.date, sequence)
    for (const orderItem of params.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItems(item, orderItem.quantity)
    }
    if (params.coupon) {
      const coupon = await this.couponRepository.get(params.coupon)
      order.addCoupon(coupon)
    }
    await this.orderRepository.save(order)
    const total = order.getTotal()
    return { total, code: order.code.value }
  }
}
