/** @module Shipment */

/**
 * Get values of packages for which has to be maximized
 * @param {Array<Package>} packages list of packages
 * @returns {Array<number>} list of value on which is to be maximized
 */
export default function maximizeByNumberOfPackage (packages) {
  // Given all package equal value = 1, to maximize by number of package
  return Array(packages.length).fill(1)
}
