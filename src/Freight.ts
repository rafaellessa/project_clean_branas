import Item from './Item'
export default class Freight {
  private DISTANCE = 1000
  private FACTOR = 100
  private total = 0
  private MIN_FREIGHT_PRICE = 10

  addItem (item: Item, quantity: number) {
    const freight = item.getVolume() * this.DISTANCE * (item.getDensity() / this.FACTOR)
    this.total += freight * quantity
  }

  getTotal () {
    return (this.total > 0 && this.total < this.MIN_FREIGHT_PRICE) ? this.MIN_FREIGHT_PRICE : this.total
  }
}
