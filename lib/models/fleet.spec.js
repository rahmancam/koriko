import { makeFleet } from './fleet'

describe('Package', () => {
  test('Should not create fleet with zero number of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 0, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: -5, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: null, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 0, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: -10, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: null, maxCarriableWeightInKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 0 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: -10 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: null })
    }).toThrow(TypeError)
  })

  test('Should create fleet with valid number of vechicles', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    expect(fleet.numberOfVehicles).toBe(2)
  })

  test('Should create fleet with valid max speed per hour', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    expect(fleet.maxSpeedInKmPerHour).toBe(70)
  })

  test('Should create fleet with valid max carriable weight', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedInKmPerHour: 70, maxCarriableWeightInKg: 200 })
    expect(fleet.maxCarriableWeightInKg).toBe(200)
  })
})
