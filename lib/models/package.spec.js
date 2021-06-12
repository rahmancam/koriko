import { makePackage } from './package'

describe('Package', () => {
  test('Should not create package without id', () => {
    expect(() => {
      makePackage({ id: null, weightKg: 100, distanceKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package without weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', distanceKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with zero weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: 0, distanceKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with negative weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: -50, distanceKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with without distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: 100, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with with zero distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 0, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with with negative distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: 100, distanceKm: -10, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should create offer without offer code', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 10 })
    }).not.toThrow(TypeError)
  })

  test('Should create valid package with the given id', () => {
    const newPackage = makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 10, offerCode: 'OFF001' })
    expect(newPackage.id).toBe('PKG1')
  })

  test('Should create valid package with the given weight', () => {
    const newPackage = makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 10, offerCode: 'OFF001' })
    expect(newPackage.weightKg).toBe(100)
  })

  test('Should create valid package with the given distance', () => {
    const newPackage = makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 10, offerCode: 'OFF001' })
    expect(newPackage.distanceKm).toBe(10)
  })

  test('Should create valid package with the given offer', () => {
    const newPackage = makePackage({ id: 'PKG1', weightKg: 100, distanceKm: 10, offerCode: 'OFF001' })
    expect(newPackage.offerCode).toBe('OFF001')
  })
})
