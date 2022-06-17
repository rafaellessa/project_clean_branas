import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
  const items = await prisma.item.createMany({
    data: [
      {
        category: 'Instrumentos Musicais',
        description: 'Guitarra',
        price: 1000,
        width: 100,
        height: 50,
        length: 15,
        weight: 3
      },
      {
        category: 'Instrumentos Musicais',
        description: 'Amplificador',
        price: 5000,
        width: 50,
        height: 50,
        length: 50,
        weight: 22
      },
      {
        category: 'Acessórios',
        description: 'Cabo',
        price: 30,
        width: 10,
        height: 10,
        length: 10,
        weight: 1
      }
    ]
  })

  const coupon = await prisma.coupon.createMany({
    data: [
      {
        code: 'VALE20',
        percentage: 20,
        expire_date: new Date('2022-10-10T10:00:00')
      },
      {
        code: 'VALE20_EXPIRED',
        percentage: 20,
        expire_date: new Date('2020-10-10T10:00:00')
      }
    ]
  })

  console.log({ items, coupon })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
