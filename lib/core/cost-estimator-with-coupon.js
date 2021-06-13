/** @module Estimator */

import baseCostEstimator from './cost-esitmator'
import applyCoupon from './coupon-handler'

/**
 * Get Package with coupon applied if applicable
 * @param {CostEstimatorWithCouponOptions} options options
 * @returns {Package} Package with coupon applied if applicable
 */
function baseEstimatorWithCoupon ({ baseCost, packageItem, coupons, settings, estimator = baseCostEstimator }) {
  if (!estimator || typeof estimator !== 'function') {
    throw new TypeError('no estimator provided to estimate the cost')
  }
  const packageWithDeliveryCost = estimator({ baseCost, packageItem, settings })
  return applyCoupon(packageWithDeliveryCost, coupons)
}

export default baseEstimatorWithCoupon
