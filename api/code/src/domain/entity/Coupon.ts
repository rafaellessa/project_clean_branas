export default class Coupon {
  constructor (readonly code: string, readonly percentage: number, readonly expirationDate: Date = new Date()) {

  }

  calculateDiscount (total: number) {
    return (total * this.percentage) / 100
  }

  isExpired (date: Date) {
    return date.getTime() > this.expirationDate.getTime()
  }
}
