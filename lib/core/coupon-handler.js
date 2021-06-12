import { getPackageWithDiscount } from '../models/package'

export default function applyCoupon (packageIem, coupons) {
  if (isValidCoupon(packageIem, coupons) && packageIem.totalCost > 0) {
    const coupon = findCoupon(packageIem.offerCode, coupons)
    return applyOfferToPackage(packageIem, coupon)
  }
  return packageIem
}

export function applyOfferToPackage (packageItem, coupon) {
  const discount = calculateDiscount(packageItem.totalCost, coupon.discountPercentage)
  return getPackageWithDiscount(packageItem, discount, coupon.discountPercentage)
}

export function calculateDiscount (totalCost, discountPercentage) {
  return (totalCost * discountPercentage) / 100
}

export function isValidCoupon (packageItem, coupons) {
  if (!packageItem || !coupons || !Array.isArray(coupons) || coupons.length === 0) {
    return false
  }
  const coupon = findCoupon(packageItem.offerCode, coupons)
  return isPackageEligibleForOffer(packageItem, coupon)
}

export function findCoupon (offerCode, coupons) {
  return coupons.filter(coupon => offerCode === coupon.code && coupon.discountPercentage > 0)[0]
}

export function isPackageEligibleForOffer (packageItem, coupon) {
  if (!packageItem || !coupon) {
    return false
  }
  const { weightKg, distanceKm } = packageItem
  const { minWeightKg, maxWeightKg, minDistanceKm, maxDistanceKm } = coupon
  return InRange(distanceKm, minDistanceKm, maxDistanceKm) &&
        InRange(weightKg, minWeightKg, maxWeightKg)
}

export function InRange (number, min, max) {
  return (number >= min && number <= max)
}
