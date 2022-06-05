import ItemRepository from '../domain/repository/ItemRepository'
import Freight from '../domain/entity/Freight'
type Input = {
  orderItems: {idItem: number, quantity: number}[]
}

type Output = {
  total: number
}

export default class SimulateFreight {
  constructor (readonly itemRepository: ItemRepository) {
  }

  async execute (input: Input):Promise<Output> {
    const freight = new Freight()
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      freight.addItem(item, orderItem.quantity)
    }
    return { total: freight.getTotal() }
  }
}
