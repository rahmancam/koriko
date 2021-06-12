import { makeFleet } from './fleet'

describe('Package', () => {
  test('Should not create fleet with zero number of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 0, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: -5, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid negative of vechiles', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: null, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 0, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: -10, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max speed per hour', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: null, maxLoadKg: 200 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with zero max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: 0 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with negative max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: -10 })
    }).toThrow(TypeError)
  })

  test('Should not create fleet with invalid max carriable weight', () => {
    expect(() => {
      makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: null })
    }).toThrow(TypeError)
  })

  test('Should create fleet with valid number of vechicles', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    expect(fleet.numberOfVehicles).toBe(2)
  })

  test('Should create fleet with valid max speed per hour', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    expect(fleet.maxSpeedKmPerHr).toBe(70)
  })

  test('Should create fleet with valid max carriable weight', () => {
    const fleet = makeFleet({ numberOfVehicles: 2, maxSpeedKmPerHr: 70, maxLoadKg: 200 })
    expect(fleet.maxLoadKg).toBe(200)
  })
})
