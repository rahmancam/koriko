/** @module Coupon */

/**
 * Apply coupon to package if valid and eligible
 * @param {Package} packageIem
 * @param {Array<Coupon>} coupons
 * @returns {Package} Package with discount
 */
export default function applyCoupon (packageIem, coupons) {
  if (isValidCoupon(packageIem, coupons) && packageIem.totalCost > 0) {
    const coupon = findCoupon(packageIem.offerCode, coupons)
    return _applyOfferToPackage(packageIem, coupon)
  }
  return packageIem
}

/**
 * Apply offer to the given package
 * @ignore
 * @param {Package} packageItem Package to apply offer
 * @param {Coupon} coupon Coupon
 * @returns {Package} Package with discount
 */
export function _applyOfferToPackage (packageItem, coupon) {
  const discount = calculateDiscount(packageItem.totalCost, coupon.discountPercentage)
  return getPackageWithDiscount(packageItem, discount, coupon.discountPercentage)
}

/**
 * Calculate discount amount
 * @param {number} totalCost Total Cost
 * @param {number} discountPercentage  Discount percentage
 * @returns {number} Discount amount
 */
export function calculateDiscount (totalCost, discountPercentage) {
  return (totalCost * discountPercentage) / 100
}

/**
 * Check if valid coupon
 * @param {Package} packageItem Package instance
 * @param {Array<Coupon>} coupons List of coupons
 * @returns {boolean} coupon valid status
 */
export function isValidCoupon (packageItem, coupons) {
  if (!packageItem || !coupons || !Array.isArray(coupons) || coupons.length === 0) {
    return false
  }
  const coupon = findCoupon(packageItem.offerCode, coupons)
  return isPackageEligibleForOffer(packageItem, coupon)
}

/**
 * Find coupon by offer code
 * @param {string} offerCode Offer code
 * @param {Array<Coupon>} coupons list of coupons
 * @returns {Coupon|undefined} Coupon or undefined
 */
export function findCoupon (offerCode, coupons) {
  return coupons.filter(coupon => offerCode === coupon.code && coupon.discountPercentage > 0)[0]
}

/**
 * Is package eligible for offer
 * @param {Package} packageItem Package instance
 * @param {Coupon} coupon Coupon
 * @returns {boolean} eligibility status
 */
export function isPackageEligibleForOffer (packageItem, coupon) {
  if (!packageItem || !coupon) {
    return false
  }
  const { weightKg, distanceKm } = packageItem
  const { minWeightKg, maxWeightKg, minDistanceKm, maxDistanceKm } = coupon
  return InRange(distanceKm, minDistanceKm, maxDistanceKm) &&
        InRange(weightKg, minWeightKg, maxWeightKg)
}
/**
 * Value In Range
 * @param {number} number value
 * @param {number} min Min value
 * @param {number} max Max value
 * @returns {boolean} status
 */
export function InRange (number, min, max) {
  return (number >= min && number <= max)
}

/**
 * Get Package with discount
 * @param {Package} packageItem Package instance
 * @param {number} discount Discount amount
 * @param {number} discountPercentage  Discount percentage
 * @returns {Package}
 */
export function getPackageWithDiscount (packageItem, discount, discountPercentage) {
  return {
    ...packageItem,
    discountPercentage: discountPercentage,
    discount,
    totalCost: packageItem.totalCost - discount
  }
}
