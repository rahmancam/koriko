import { makeShipment } from './shipment'

describe('Shipment', () => {
  test('Should not create shipment with zero number of packages', () => {
    expect(() => {
      makeShipment({ packages: [] })
    }).toThrow(TypeError)
  })

  test('Should not create shipment if no packages provided', () => {
    expect(() => {
      makeShipment()
    }).toThrow(TypeError)
  })
})
