/** @module Shipment */
import { makeShipment } from '../models/shipment'
import maximizeByNumberOfPackage from './maximize-by-package'

/**
 * Base shipment allocation strategy
 * @param {ShipmentAllocationOption} options
 * @param {function} [maximizeBy] maximize by strategy
 * @returns {Array<Shipment>}
 */
function baseShipmentAllocationStrategy ({ packages, maxLoadKg }, maximizeBy = maximizeByNumberOfPackage) {
  return getShipmentsWithMaximumValue({ packages, maxLoadKg }, maximizeBy)
}

/**
 * Base shipment allocation strategy
 * @ignore
 * @param {ShipmentAllocationOption} options
 * @param {function} [maximizeBy] maximize by strategy
 * @returns {Array<Shipment>}
 */
export function getShipmentsWithMaximumValue ({ packages, maxLoadKg }, maximizeBy = maximizeByNumberOfPackage) {
  validateOrThrowError({ packages, maxLoadKg })

  if (packages.length === 1) {
    return [makeShipment({ packages })]
  }

  const shipments = []
  packages = [...packages] // copy of packages
  packages.sort(sortWeightsByDesc)

  while (packages.length) {
    const { permutations, weights, values } = getPerumutation({ packages, maxLoadKg }, maximizeBy)
    const shipment = getShipmentsFromPermuation({ permutations, packages, weights, values, maxLoadKg })
    packages = getFilteredPackages({ packages, selectedPackages: shipment.packages })
    shipments.push(shipment)
  }

  return shipments
}

/**
 * Filter selected packages from the list
 * @ignore
 * @param {FileterPackageOptions} options
 * @returns {Array<Package>} filtered packages
 */
export function getFilteredPackages ({ packages, selectedPackages }) {
  return packages.filter((item) => {
    return !(selectedPackages
      .filter((selectedItem) => selectedItem.uuid === item.uuid).length > 0)
  })
}

/**
 * Get maximized value packages and get shipments
 * @ignore
 * @param {ShipmentPermutationOption} options
 * @returns {Shipment} shipment
 */
export function getShipmentsFromPermuation ({ permutations, packages, weights, values, maxLoadKg }) {
  let selectedPackages = []
  let totalValues = permutations[weights.length - 1][maxLoadKg]
  let remainingLoad = maxLoadKg
  for (let index = weights.length - 1; index > 0; index--) {
    if (totalValues !== permutations[index - 1][remainingLoad]) {
      selectedPackages.push(packages[index])
      remainingLoad -= weights[index]
      totalValues -= values[index]
    }
  }

  if (totalValues !== 0) {
    // if not becomes zero, then first is the max
    selectedPackages = [packages[0]]
  }
  return makeShipment({ packages: selectedPackages })
}

/**
 * Sort weight by descending (comparator)
 * @ignore
 * @param {Package} item1
 * @param {Package} item2
 * @returns {number} comparator value
 */
export function sortWeightsByDesc (item1, item2) {
  return item2.weightKg - item1.weightKg
}

/**
 * Get maximized values
 * Solved using 0/1 Knapsack algorithm
 * @ignore
 * @param {PermutationOption} options
 * @param {function} maximizeBy maximize by value
 * @returns {Object}
 */
export function getPerumutation ({ packages, maxLoadKg }, maximizeBy = maximizeByNumberOfPackage) {
  const numberOfPackages = packages?.length
  const weights = packages?.map((item) => item.weightKg)
  // Give all package equal value to maximize
  const values = maximizeBy(packages)

  const dpCache = Array(values.length)
    .fill(0)
    .map(() => Array(maxLoadKg + 1).fill(0))

  for (let index = 0; index < numberOfPackages; index++) dpCache[index][0] = 0

  // if we have only one weight, we will take it if it is not more than the capacity
  for (let index = 0; index <= maxLoadKg; index++) {
    if (weights[0] <= index) dpCache[0][index] = values[0]
  }

  // process all sub-arrays for all the loads
  for (let packageIndex = 1; packageIndex < numberOfPackages; packageIndex++) {
    for (let loadIndex = 1; loadIndex <= maxLoadKg; loadIndex++) {
      let includeMaxValue = 0
      let excludeMaxValue = 0
      // include the item, if it is not more than the capacity
      if (weights[packageIndex] <= loadIndex) includeMaxValue = values[packageIndex] + dpCache[packageIndex - 1][loadIndex - weights[packageIndex]]
      // exclude the item
      excludeMaxValue = dpCache[packageIndex - 1][loadIndex]
      // take maximum
      dpCache[packageIndex][loadIndex] = Math.max(includeMaxValue, excludeMaxValue)
    }
  }

  return {
    permutations: dpCache,
    weights,
    values
  }
}

/**
 * Input arguments validation
 * @param {AllocatorOption} options
 * @returns void
 */
function validateOrThrowError ({ packages, maxLoadKg }) {
  if (!packages || !Array.isArray(packages) || packages.length <= 0) {
    throw new TypeError('Input packages is not valid to getShipmentWithMaximumPackage')
  }

  if (!maxLoadKg || maxLoadKg <= 0 || typeof maxLoadKg !== 'number') {
    throw new TypeError(`Invalid maxLoadKg: ${maxLoadKg} to get getShipmentWithMaximumPackage`)
  }
}

export default baseShipmentAllocationStrategy
