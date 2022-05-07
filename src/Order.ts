import Cpf from './Cpf'
import Item from './Item'
import OrderItem from './OrderItem'
import Coupon from './Coupon'
export default class Order {
  cpf: Cpf
  orderItems: OrderItem[]
  coupon?: Coupon

  constructor (cpf: string) {
    this.orderItems = []
    this.cpf = new Cpf(cpf)
  }

  addItems (item: Item, quantity: number) {
    this.orderItems.push(new OrderItem(item.id, item.description, item.price, quantity))
  }

  addCoupon (coupon: Coupon) {
    this.coupon = coupon
  }

  getTotal () {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)

    if (this.coupon) {
      total = this.coupon.calculateDiscount(total)
    }
    return total
  }
}
