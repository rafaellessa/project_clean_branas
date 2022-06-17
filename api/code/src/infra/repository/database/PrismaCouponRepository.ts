import Coupon from '../../../domain/entity/Coupon'
import CouponRepository from '../../../domain/repository/CouponRepository'
import { PrismaClient } from '@prisma/client'
export default class PrismaCouponRepository implements CouponRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  async get (code: string): Promise<Coupon> {
    const coupon = await this.prisma.coupon.findUnique({
      where: {
        code
      }
    })

    if (!coupon) throw new Error('coupon not found')
    return new Coupon(coupon.code, Number(coupon.percentage), new Date(coupon.expire_date))
  }

  async save (coupon: Coupon): Promise<void> {
    await this.prisma.coupon.create({
      data: {
        code: coupon.code,
        percentage: coupon.percentage,
        expire_date: new Date(coupon.expirationDate)
      }
    })
  }
}
