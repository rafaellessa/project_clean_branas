export default class OrderItem {
  constructor (readonly idItem: number, readonly description: string, readonly price: number, readonly quantity: number) {
  }

  getTotal () {
    return this.price * this.quantity
  }
}
