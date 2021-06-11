import InvalidConfigurationError from '../lib/models/errors/invalid-configuration-error'
import makeCourierDb from './courier-db'

describe('Courier DB', () => {
  let makeDb = null

  beforeEach(() => {
    makeDb = function () {
      return { coupons: [{ code: 'OFF001' }, { code: 'OFF002' }] }
    }
  })
  test('Should return valid coupons if configured', () => {
    const courierDB = makeCourierDb({ makeDb })
    const allCoupons = courierDB.findAllCoupons()
    expect(makeDb().coupons).toEqual(allCoupons)
  })

  test('Should return no coupons if not configured', () => {
    const makeDb = () => ({})
    const courierDB = makeCourierDb({ makeDb })
    const allCoupons = courierDB.findAllCoupons()
    expect(makeDb().coupons).toEqual(allCoupons)
  })

  test('Should throw error if no settings configured', () => {
    const makeDb = () => ({})
    const courierDB = makeCourierDb({ makeDb })
    expect(() => {
      courierDB.findAllSettings()
    }).toThrow(InvalidConfigurationError)
  })

  test('Should throw error if costPerKg configured is zero', () => {
    const makeDb = function () {
      return { settings: { costPerKg: 0, costPerKm: 10 } }
    }
    const courierDB = makeCourierDb({ makeDb })
    expect(() => {
      courierDB.findAllSettings()
    }).toThrow(InvalidConfigurationError)
  })

  test('Should throw error if costPerKg configured is negative', () => {
    const makeDb = function () {
      return { settings: { costPerKg: -10, costPerKm: 10 } }
    }
    const courierDB = makeCourierDb({ makeDb })
    expect(() => {
      courierDB.findAllSettings()
    }).toThrow(InvalidConfigurationError)
  })

  test('Should throw error if costPerKm configured is zero', () => {
    const makeDb = function () {
      return { settings: { costPerKg: 10, costPerKm: 0 } }
    }
    const courierDB = makeCourierDb({ makeDb })
    expect(() => {
      courierDB.findAllSettings()
    }).toThrow(InvalidConfigurationError)
  })

  test('Should throw error if costPerKm configured is negative', () => {
    const makeDb = function () {
      return { settings: { costPerKg: 10, costPerKm: -5 } }
    }
    const courierDB = makeCourierDb({ makeDb })
    expect(() => {
      courierDB.findAllSettings()
    }).toThrow(InvalidConfigurationError)
  })

  test('Should get valid settings if configured', () => {
    const makeDb = function () {
      return { settings: { costPerKg: 10, costPerKm: 5 } }
    }
    const courierDB = makeCourierDb({ makeDb })
    expect(
      courierDB.findAllSettings()
    ).toEqual(makeDb().settings)
  })
})
