import makeShipmentAllocator from './shipment-allocator'

describe('Shipment Allocator', () => {
  let shipmenAllocator = null
  let packages = null
  beforeEach(() => {
    const maxLoadKg = 200
    shipmenAllocator = makeShipmentAllocator({ maxLoadKg })
    packages = [
      {
        id: 'PKG1',
        weightKg: 50
      },
      {
        id: 'PKG2',
        weightKg: 75
      },
      {
        id: 'PKG3',
        weightKg: 175
      },
      {
        id: 'PKG4',
        weightKg: 110
      },
      {
        id: 'PKG5',
        weightKg: 155
      }]
  })

  test('Should not create shipments with invalid packages', () => {
    expect(() => {
      shipmenAllocator.allocate(null)
    }).toThrow(TypeError)
  })

  test('Should not create shipments with zero packages', () => {
    expect(() => {
      shipmenAllocator.allocate([])
    }).toThrow(TypeError)
  })

  test('Should not create shipments with non-array type packages', () => {
    expect(() => {
      shipmenAllocator.allocate({})
    }).toThrow(TypeError)
  })

  test('Should not create shipments if allocation strategy passed is null', () => {
    expect(() => {
      shipmenAllocator.allocate(packages, null)
    }).toThrow(TypeError)
  })

  test('Should allocate correct number of shipments', () => {
    const shipments = shipmenAllocator.allocate(packages)
    expect(shipments.length).toBe(4)
  })

  test('Should allocate shipments and must have expected weights', () => {
    const shipments = shipmenAllocator.allocate(packages)
    expect(shipments[0].getWeightkg()).toBe(185)
    expect(shipments[1].getWeightkg()).toBe(175)
    expect(shipments[2].getWeightkg()).toBe(155)
    expect(shipments[3].getWeightkg()).toBe(50)
  })

  test('Should allocate single shipment if single package provided', () => {
    const shipments = shipmenAllocator.allocate([{ id: 'PKG1', weightKg: 120 }])
    expect(shipments.length).toBe(1)
  })
})
