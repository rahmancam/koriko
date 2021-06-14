import baseShipmentEstimator from './shipment-estimator'

describe('Shipment Estimator', () => {
  let fleetDetail = null
  let packages = null
  beforeEach(() => {
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
    packages.forEach((item) => {
      item.uuid = item.id
    })
    fleetDetail = { numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: 200 }
  })

  test('Should not create shipments with invalid packages', () => {
    expect(() => {
      baseShipmentEstimator([])
    }).toThrow(TypeError)
  })

  test('Should allocate shipments and must have expected weights', () => {
    const shipments = baseShipmentEstimator(packages, fleetDetail)
    expect(shipments[0].getWeightkg()).toBe(185)
    expect(shipments[1].getWeightkg()).toBe(175)
    expect(shipments[2].getWeightkg()).toBe(155)
    expect(shipments[3].getWeightkg()).toBe(50)
  })

  test('Should allocate single shipment if single package provided', () => {
    const shipments = baseShipmentEstimator(packages, fleetDetail)
    expect(shipments.length).toBe(4)
  })

  test('Should execute custom maximization logic', () => {
    const maximizeBy = jest.fn((packages) => packages.map(item => item.totalCost))
    const shipments = baseShipmentEstimator(packages, fleetDetail, maximizeBy)
    expect(maximizeBy).toHaveBeenCalled()
    expect(shipments.length).toBe(5)
  })

  test('Should execute custom shipment strategy', () => {
    const shipmentStrategty = jest.fn(() => [])
    baseShipmentEstimator(packages, fleetDetail, undefined, shipmentStrategty)
    expect(shipmentStrategty).toHaveBeenCalled()
  })

  test('Should execute custom fleet strategy', () => {
    const fleetStrategty = jest.fn(() => [])
    baseShipmentEstimator(packages, fleetDetail, undefined, undefined, fleetStrategty)
    expect(fleetStrategty).toHaveBeenCalled()
  })
})
