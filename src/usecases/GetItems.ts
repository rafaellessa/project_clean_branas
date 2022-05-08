import ItemRepository from '../domain/repository/ItemRepository'

type GetItemsResponse = {
  idItem: number
  description: string
  price: number
}

export default class GetItems {
  constructor (readonly itemRepository: ItemRepository) {}
  async execute (): Promise<GetItemsResponse[]> {
    const items = await this.itemRepository.list()
    const response:GetItemsResponse[] = []
    for (const item of items) {
      response.push({
        idItem: item.id,
        description: item.description,
        price: item.price
      })
    }
    return response
  }
}
