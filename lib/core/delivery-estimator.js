import baseEstimatorWithCoupon from './cost-estimator-with-coupon'
import maximizeByNumberOfPackage from './maximize-by-package'
import baseShipmentEstimator from './shipment-estimator'

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

  function estimateTime (packages, fleetDetail,
    costEstimator = baseEstimatorWithCoupon,
    timeEstimator = baseShipmentEstimator,
    maximizeBy = maximizeByNumberOfPackage) {
    const packagesWithCost = estimateCost(packages, costEstimator)
    return baseShipmentEstimator(packagesWithCost, fleetDetail, maximizeBy)
  }

  return {
    estimateCost,
    estimateTime
  }
}
