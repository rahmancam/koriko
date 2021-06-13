/** @module Estimator */

import baseEstimatorWithCoupon from './cost-estimator-with-coupon'
import maximizeByNumberOfPackage from './maximize-by-package'
import baseShipmentEstimator from './shipment-estimator'

/**
 * Factory function to make a new estimator
 * @param {EstimatorOptions} options estimator options
 * @returns {EstimatorAPI} API to estimate cost
 */
export function makeDeliveryEstimator ({ baseCost, coupons, settings }) {
  /**
   * Estimate cost
   * @param {Array<Package>} packages packages to estimate
   * @param {Function} estimator override function to estimate
   * @returns {Array<Package>} packages with estimation
   */
  function estimateCost (packages, estimator = baseEstimatorWithCoupon) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to estimate the cost')
    }

    if (!estimator || typeof estimator !== 'function') {
      throw new TypeError('no estimator provided to estimate the cost')
    }
    return packages.map(packageItem => estimator({ baseCost, packageItem, coupons, settings }))
  }

  /**
   * Estimate delivery time with cost
   * @param {Array<Package>} packages Packages to estimate
   * @param {FleetOptions} fleetDetail Fleet detail for shipment
   * @param {Function} [costEstimator] override cost estimator (optional)
   * @param {Function} [timeEstimator] override time estimator (optional)
   * @param {Function} [maximizeBy] override maximize by strategy (optional)
   * @returns {Array<Shipment>} shipment details with estimated delivery time
   */
  function estimateTime (packages, fleetDetail,
    costEstimator = baseEstimatorWithCoupon,
    timeEstimator = baseShipmentEstimator,
    maximizeBy = maximizeByNumberOfPackage) {
    const packagesWithCost = estimateCost(packages, costEstimator)
    return timeEstimator(packagesWithCost, fleetDetail, maximizeBy)
  }

  return {
    estimateCost,
    estimateTime
  }
}

export default makeDeliveryEstimator
