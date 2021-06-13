/** @module Package */

import { v4 as uuid } from 'uuid'
import validatePackageOrThrowError from '../helpers/validate-package'

/**
 * Package class holds all the package related information
 */
class Package {
  /**
   * @property {string} uuid internal unique package Id
   */
  uuid = `${uuid()}`
  /**
   * @property {string} id Package Id
   */
  id = `${uuid()}`;
  /**
   * @property {number} weightKg Package Weight in Kg
   */
  weightKg = 0;
  /**
   * @property {number} distanceKm Package delivery distance in Km
   */
  distanceKm = 0;
  /**
   * @property {string} offerCode Coupon code
   */
  offerCode = '';
  /**
   * @property {number} cost Delivery cost
   */
  cost = 0;
  /**
   * @property {number} discountPercentage Discounted percentage if coupon applied
   */
  discountPercentage = 0;
  /**
   * @property {number} discount Discount amount
   */
  discount = 0;
  /**
   * @property {number} totalCost Total cost of delivery
   */
  totalCost = 0;
  /**
   * @property {number} deliveryEstimateTimeHrs Delivery estimate hours
   */
  deliveryEstimateTimeHrs = 0
  /**
   * @property {number} actualEstimateHrs Actual estimate hours
   */
  actualEstimateHrs = 0

  constructor ({ id, weightKg, distanceKm, offerCode }) {
    this.id = id
    this.weightKg = parseInt(weightKg)
    this.distanceKm = parseInt(distanceKm)
    this.offerCode = offerCode
  }
}

/**
 * Factory function to make new package instance
 * @param {PackageOptions} options
 * @returns {Package}
 */
export function makePackage ({ id, weightKg, distanceKm, offerCode }) {
  validatePackageOrThrowError({ id, weightKg, distanceKm, offerCode })
  return new Package({ id, weightKg, distanceKm, offerCode })
}

export default Package
