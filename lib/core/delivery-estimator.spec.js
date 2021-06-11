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
            minDistanceInKm: 0,
            maxDistanceInKm: 200,
            minWeightInKg: 70,
            maxWeightInKg: 200
          },
          {
            code: 'OFR003',
            discountPercentage: 5,
            minDistanceInKm: 50,
            maxDistanceInKm: 250,
            minWeightInKg: 10,
            maxWeightInKg: 150
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
    const newPackage = { id: 'PKG1', weightInKg: 5, distanceInKm: 5 }
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
    const newPackage = { id: 'PKG1', weightInKg: 5, distanceInKm: 5, offerCode: 'OFR001' }
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
    const newPackage = { id: 'PKG1', weightInKg: 10, distanceInKm: 100, offerCode: 'OFR003' }
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
    const newPackage = { id: 'PKG1', weightInKg: 10, distanceInKm: 100, offerCode: 'OFR003' }
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
    const newPackage = { id: 'PKG1', weightInKg: 10, distanceInKm: 100, offerCode: 'OFR003' }
    expect(() => {
      estimator.estimateCost([makePackage(newPackage)], null)
    }).toThrow(TypeError)
  })
})
