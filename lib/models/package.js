/** @module package */

import validatePackageOrThrowError from '../helpers/validate-package'

/**
 * Package class
 * @class Package
 * @classdesc Package class holds all the package related information
 */
class Package {
    /**
     * Package Id
     * @type {string}
     */
    id = '';
    /**
     * Package Weight in Kg
     * @type {number}
     */
    weightKg = 0;
    /**
     * Package delivery distance in Km
     * @type {number}
     */
    distanceKm = 0;
    /**
     * Coupon code
     * @type {string}
     */
    offerCode = '';
    /**
     * Delivery cost
     * @type {string}
     */
    cost = 0;
    /**
     * Discounted percentage if coupon applied
     * @type {string}
     */
    discountPercentage = 0;
    /**
     * Discount amount
     * @type {string}
     */
    discount = 0;
    /**
     * Final cost of delivery after discount
     * @type {string}
     */
    totalCost = 0;

    constructor ({ id, weightKg, distanceKm, offerCode }) {
      this.id = id
      this.weightKg = weightKg
      this.distanceKm = distanceKm
      this.offerCode = offerCode
    }
}

/**
 * Factory function to make new package instance
 * @function
 * @param {string} id - Package id
 * @param {number} weightKg - weight in Kg
 * @param {number} distanceKm - distance in km
 * @param {string} offerCode - offer code
 * @return {Package} The new package instance
 */
export function makePackage ({ id, weightKg, distanceKm, offerCode }) {
  validatePackageOrThrowError({ id, weightKg, distanceKm, offerCode })
  return new Package({ id, weightKg, distanceKm, offerCode })
}

export function getPackageWithCost (packageItem, cost) {
  return {
    ...packageItem,
    cost,
    totalCost: cost
  }
}

export function getPackageWithDiscount (packageItem, discount, discountPercentage) {
  return {
    ...packageItem,
    discountPercentage: discountPercentage,
    discount,
    totalCost: packageItem.totalCost - discount
  }
}

export default Package
