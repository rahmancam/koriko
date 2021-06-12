import baseEstimator from './cost-esitmator'
import applyCoupon from './coupon-handler'

export default function baseEstimatorWithCoupon ({ baseCost, packageItem, coupons, settings, estimator = baseEstimator }) {
  if (!estimator || typeof estimator !== 'function') {
    throw new TypeError('no estimator provided to estimate the cost')
  }
  const packageWithDeliveryCost = estimator({ baseCost, packageItem, settings })
  return applyCoupon(packageWithDeliveryCost, coupons)
}
