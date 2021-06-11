import { makePackage } from './package'

describe('Package', () => {
  test('Should not create package without id', () => {
    expect(() => {
      makePackage({ id: null, weightInKg: 100, distanceInKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package without weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', distanceInKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with zero weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: 0, distanceInKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with negative weight', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: -50, distanceInKm: 50, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with without distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: 100, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with with zero distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 0, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should not create package with with negative distance', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: -10, offerCode: 'OFF001' })
    }).toThrow(TypeError)
  })

  test('Should create offer without offer code', () => {
    expect(() => {
      makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 10 })
    }).not.toThrow(TypeError)
  })

  test('Should create valid package with the given id', () => {
    const newPackage = makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 10, offerCode: 'OFF001' })
    expect(newPackage.id).toBe('PKG1')
  })

  test('Should create valid package with the given weight', () => {
    const newPackage = makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 10, offerCode: 'OFF001' })
    expect(newPackage.weightInKg).toBe(100)
  })

  test('Should create valid package with the given distance', () => {
    const newPackage = makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 10, offerCode: 'OFF001' })
    expect(newPackage.distanceInKm).toBe(10)
  })

  test('Should create valid package with the given offer', () => {
    const newPackage = makePackage({ id: 'PKG1', weightInKg: 100, distanceInKm: 10, offerCode: 'OFF001' })
    expect(newPackage.offerCode).toBe('OFF001')
  })
})
