import baseEstimatorWithCoupon from './cost-estimator-with-coupon'

export default function makeDeliveryEstimator ({ baseCost, coupons, settings }) {
  function estimateCost (packages, estimator = baseEstimatorWithCoupon) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to estimate the cost')
    }

    if (!estimator || typeof estimator !== 'function') {
      throw new TypeError('no estimator provided to estimate the cost')
    }
    return packages.map(packageItem => estimator({ baseCost, packageItem, coupons, settings }))
  }

  function estimateTimeWithCost (packages, fleetDetail) {
    // const packagesWithCost = estimateCost(packages)
  }

  return {
    estimateCost,
    estimateTimeWithCost
  }
}
