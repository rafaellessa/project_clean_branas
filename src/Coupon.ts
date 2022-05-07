export default class Coupon {
  constructor (readonly code: string, readonly percentage: number) {
  }

  calculateDiscount (total: number) {
    total -= (total * this.percentage) / 100
    return total
  }
}
