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
            minimumDistanceInKm: 0,
            maximunDistanceInKm: 200,
            minimumWeightInKg: 70,
            maxWeightInKg: 200
          }
        ]
      }
    }
  })
  test('Should return correct delivery cost without coupon', () => {
    const courierDB = makeDb()
    const baseCost = 100
    const { settings } = courierDB
    const estimator = makeDeliveryEstimator({
      baseCost,
      settings
    })
    const newPackage = { id: 'PKG1', weightInKg: 5, distanceInKm: 5 }
    const estimatedPackages = estimator.estimateCost([makePackage(newPackage)])
    expect(estimatedPackages[0].deliveryCost).toBe(175)
  })
})
