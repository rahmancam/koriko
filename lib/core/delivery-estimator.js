import { validatePackageOrThrowError, validateSettingsOrThrowError } from '../helpers/validate'
import { getPackageWithCost } from '../models/package'
import applyCoupon from './coupon-handler'

export default function makeDeliveryEstimator ({ baseCost, coupons, settings }) {
  function estimateCost (packages, estimator = baseEstimatorWithCoupon) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to estimate the cost')
    }

    if (!estimator) {
      throw new TypeError('no estimator provided to estimate the cost')
    }
    return packages.map(packageItem => estimator(packageItem))
  }

  function baseEstimatorWithCoupon (packageItem, estimator = baseEstimator) {
    const packageWithDeliveryCost = estimator(packageItem)
    return applyCoupon(packageWithDeliveryCost, coupons)
  }

  function baseEstimator (packageItem) {
    if (!baseCost || baseCost <= 0 || typeof baseCost !== 'number') {
      throw new TypeError(`base cost : ${baseCost} is not valid`)
    }

    validatePackageOrThrowError(packageItem)
    validateSettingsOrThrowError({ settings })

    const { weightInKg, distanceInKm } = packageItem
    const { costPerKg, costPerKm } = settings
    const deliveryCost = calculateDeliveryCost(baseCost, costPerKg, costPerKm, weightInKg, distanceInKm)

    return getPackageWithCost(packageItem, deliveryCost)
  }

  function estimateTimeWithCost (packages, fleetDetail, costEstimator = estimateCost) {

  }

  return {
    estimateCost,
    estimateTimeWithCost
  }
}

export function calculateDeliveryCost (baseCost, costPerKg, costPerKm, weightInKg, distanceInKm) {
  return baseCost + (weightInKg * costPerKg) + (distanceInKm * costPerKm)
}
