import { validatePackageOrThrowError, validateSettingsOrThrowError } from '../helpers/validate'

export default function makeDeliveryEstimator ({ baseCost, coupons, settings }) {
  function estimateCost (packages, estimator = baseEstimator) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to estimate the cost')
    }

    if (!estimator) {
      throw new TypeError('no estimator provided to estimate the cost')
    }

    return packages.map(estimator)
  }

  function baseEstimator (packageItem) {
    if (!baseCost || baseCost <= 0 || typeof baseCost !== 'number') {
      throw new TypeError(`base cost : ${baseCost} is not valid`)
    }

    validatePackageOrThrowError(packageItem)
    validateSettingsOrThrowError({ settings })

    const { weightInKg, distanceInKm } = packageItem
    const { costPerKg, costPerKm } = settings
    const deliveryCost = baseCost + (weightInKg * costPerKg) + (distanceInKm * costPerKm)

    return {
      ...packageItem,
      deliveryCost
    }
  }

  function estimateTimeWithCost (packages, fleetDetail, costEstimator = estimateCost) {

  }

  return {
    estimateCost,
    estimateTimeWithCost
  }
}
