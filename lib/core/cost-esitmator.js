/** @module Estimator */

import { validatePackageOrThrowError, validateSettingsOrThrowError } from '../helpers/validate'

/**
 * Base cost estimator
 * @param {CostEstimatorOptions} estimator options
 * @returns {Package} package with cost estimation
 */
function baseEstimator ({ baseCost, packageItem, settings }) {
  if (!baseCost || baseCost <= 0 || typeof baseCost !== 'number') {
    throw new TypeError(`base cost : ${baseCost} is not valid`)
  }

  validatePackageOrThrowError(packageItem)
  validateSettingsOrThrowError({ settings })

  const { weightKg, distanceKm } = packageItem
  const { costPerKg, costPerKm } = settings
  const deliveryCost = calculateDeliveryCost(baseCost, costPerKg, costPerKm, weightKg, distanceKm)

  return getPackageWithCost(packageItem, deliveryCost)
}

/**
 * Calculate delivery cost
 * @param {number} baseCost Base cost
 * @param {number} costPerKg  Cost per Kg
 * @param {number} costPerKm Cost per km
 * @param {number} weightKg  Weight kg
 * @param {number} distanceKm  Distance km
 * @returns {number} Delivery cost
 */
export function calculateDeliveryCost (baseCost, costPerKg, costPerKm, weightKg, distanceKm) {
  return baseCost + (weightKg * costPerKg) + (distanceKm * costPerKm)
}

/**
 * Get Package with cost
 * @param {Package} packageItem Package instance
 * @param {number} cost Cost of the package
 * @returns {Package}
 */
export function getPackageWithCost (packageItem, cost) {
  return {
    ...packageItem,
    cost,
    totalCost: cost
  }
}

export default baseEstimator
