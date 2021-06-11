import { validatePackageOrThrowError, validateSettingsOrThrowError } from '../helpers/validate'
import { getPackageWithCost } from '../models/package'

export default function baseEstimator ({ baseCost, packageItem, settings }) {
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

export function calculateDeliveryCost (baseCost, costPerKg, costPerKm, weightInKg, distanceInKm) {
  return baseCost + (weightInKg * costPerKg) + (distanceInKm * costPerKm)
}
