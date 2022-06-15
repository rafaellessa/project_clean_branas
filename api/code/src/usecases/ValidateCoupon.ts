import CouponRepository from '../domain/repository/CouponRepository'
type Input = {
  code: string
  date: Date
}
type Output = {
  isExpired: boolean
}

export default class ValidateCoupon {
  constructor (readonly couponRepository: CouponRepository) {
  }

  async execute (input: Input): Promise<Output> {
    const coupon = await this.couponRepository.get(input.code)
    if (!coupon) throw new Error('Coupon not found')
    const isExpired = coupon.isExpired(input.date)
    return {
      isExpired
    }
  }
}
