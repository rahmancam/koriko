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
    weightInKg = 0;
    /**
     * Package delivery distance in Km
     * @type {number}
     */
    distanceInKm = 0;
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

    constructor ({ id, weightInKg, distanceInKm, offerCode }) {
      this.id = id
      this.weightInKg = weightInKg
      this.distanceInKm = distanceInKm
      this.offerCode = offerCode
    }
}

/**
 * Factory function to make new package instance
 * @function
 * @param {string} id - Package id
 * @param {number} weightInKg - weight in Kg
 * @param {number} distanceInKm - distance in km
 * @param {string} offerCode - offer code
 * @return {Package} The new package instance
 */
export function makePackage ({ id, weightInKg, distanceInKm, offerCode }) {
  validatePackageOrThrowError({ id, weightInKg, distanceInKm, offerCode })
  return new Package({ id, weightInKg, distanceInKm, offerCode })
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
