import { makePackage } from '../models/package'
import makeDeliveryEstimator from './delivery-estimator'

describe('Delivery Estimator', () => {
  let makeDb = null

  beforeEach(() => {
    makeDb = function () {
      return {
        settings: {
          costPerKg: 10,
          costPerKm: 5
        },
        coupons: [
          {
            code: 'OFR001',
            discountPercentage: 10,
            minDistanceKm: 0,
            maxDistanceKm: 200,
            minWeightKg: 70,
            maxWeightKg: 200
          },
          {
            code: 'OFR003',
            discountPercentage: 5,
            minDistanceKm: 50,
            maxDistanceKm: 250,
            minWeightKg: 10,
            maxWeightKg: 150
          }
        ]
      }
    }
  })
  test('Should return correct delivery cost without coupon', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    const newPackage = { id: 'PKG1', weightKg: 5, distanceKm: 5 }
    const estimatedPackages = estimator.estimateCost([makePackage(newPackage)])
    expect(estimatedPackages[0].totalCost).toBe(175)
  })

  test('Should return correct delivery cost with non-eligible coupon', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings
    })
    const newPackage = { id: 'PKG1', weightKg: 5, distanceKm: 5, offerCode: 'OFR001' }
    const estimatedPackages = estimator.estimateCost([makePackage(newPackage)])
    expect(estimatedPackages[0].totalCost).toBe(175)
  })

  test('Should return correct delivery cost with eligible coupon', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    const newPackage = { id: 'PKG1', weightKg: 10, distanceKm: 100, offerCode: 'OFR003' }
    const estimatedPackages = estimator.estimateCost([makePackage(newPackage)])
    expect(estimatedPackages[0].totalCost).toBe(665)
  })

  test('Should return correct discount with eligible coupon', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    const newPackage = { id: 'PKG1', weightKg: 10, distanceKm: 100, offerCode: 'OFR003' }
    const estimatedPackages = estimator.estimateCost([makePackage(newPackage)])
    expect(estimatedPackages[0].discount).toBe(35)
  })

  test('Should throw error if no packages provided to estimate', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    expect(() => {
      estimator.estimateCost()
    }).toThrow(TypeError)
  })

  test('Should throw error if non-array is provided to provider for estimatation', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    expect(() => {
      estimator.estimateCost({})
    }).toThrow(TypeError)
  })

  test('Should throw error if zero baseCost provided for estimation', () => {
    const courierDB = makeDb()
    const baseCost = 0
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    expect(() => {
      estimator.estimateCost({})
    }).toThrow(TypeError)
  })

  test('Should throw error if negative baseCost provided for estimation', () => {
    const courierDB = makeDb()
    const baseCost = -100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    expect(() => {
      estimator.estimateCost({})
    }).toThrow(TypeError)
  })

  test('Should throw error if null estimator provided to estimate', () => {
    const courierDB = makeDb()
    const baseCost = -100
    const { settings, coupons } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings,
      coupons
    })
    const newPackage = { id: 'PKG1', weightKg: 10, distanceKm: 100, offerCode: 'OFR003' }
    expect(() => {
      estimator.estimateCost([makePackage(newPackage)], null)
    }).toThrow(TypeError)
  })
})
