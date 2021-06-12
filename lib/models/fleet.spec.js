import { makeFleet } from './fleet'

describe('Package', () => {
  test('Should not create fleet with zero number of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 0, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: -5, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: null, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 0, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: -10, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: null, maxCarriableWeightKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 0 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: -10 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: null })
    }).toThrow(TypeError)
  })

  test('Should create fleet with valid number of vechicles', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    expect(fleet.numberOfVehicles).toBe(2)
  })

  test('Should create fleet with valid max speed per hour', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    expect(fleet.maxSpeedKmPerHour).toBe(70)
  })

  test('Should create fleet with valid max carriable weight', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHour: 70, maxCarriableWeightKg: 200 })
    expect(fleet.maxCarriableWeightKg).toBe(200)
  })
})
