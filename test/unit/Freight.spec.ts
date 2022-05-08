import Dimension from '../../src/domain/entity/Dimension'
import Freight from '../../src/domain/entity/Freight'
import Item from '../../src/domain/entity/Item'

describe('test', () => {
  it('Deve calcular um frete', () => {
    const freight = new Freight()
    freight.addItem(new Item(1, 'Guitarra', 2000, new Dimension(100, 30, 10), 3), 1)
    freight.addItem(new Item(2, 'Amplificador', 4000, new Dimension(50, 50, 50), 20), 1)
    freight.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 1), 2)
    const total = freight.getTotal()
    expect(total).toBe(250)
  })

  it('Deve calcular um frete com preço mínimo', () => {
    const freight = new Freight()
    freight.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10), 0.9), 1)
    const total = freight.getTotal()
    expect(total).toBe(10)
  })
})
