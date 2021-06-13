import { makeShipment } from '../models/shipment'

export default function baseShipmentAllocationStrategy ({ packages, maxLoadKg }) {
  return getShipmentsWithMaximumPackage({ packages, maxLoadKg })
}

export function getShipmentsWithMaximumPackage ({ packages, maxLoadKg }) {
  validateOrThrowError({ packages, maxLoadKg })

  if (packages.length === 1) {
    return [makeShipment({ packages })]
  }

  const shipments = []
  packages = [...packages] // copy of packages
  packages.sort(sortWeights)

  while (packages.length) {
    const { permutations, weights, values } = getPerumutation({ packages, maxLoadKg })
    const shipment = getShipmentsFromPermuation({ permutations, packages, weights, values, maxLoadKg })
    packages = getFilteredPackages({ packages, selectedPackages: shipment.packages })
    shipments.push(shipment)
  }

  return shipments
}

export function getFilteredPackages ({ packages, selectedPackages }) {
  return packages.filter((item) => {
    return !(selectedPackages
      .filter((selectedItem) => selectedItem.uuid === item.uuid).length > 0)
  })
}

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

export function sortWeights (item1, item2) {
  return item2.weightKg - item1.weightKg
}

export function getPerumutation ({ packages, maxLoadKg }) {
  const numberOfPackages = packages?.length
  const weights = packages?.map((item) => item.weightKg)
  // Give all package equal value to maximize
  const values = Array(packages.length).fill(1)

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

export function validateOrThrowError ({ packages, maxLoadKg }) {
  if (!packages || !Array.isArray(packages) || packages.length <= 0) {
    throw new TypeError('Input packages is not valid to getShipmentWithMaximumPackage')
  }

  if (!maxLoadKg || maxLoadKg <= 0 || typeof maxLoadKg !== 'number') {
    throw new TypeError(`Invalid maxLoadKg: ${maxLoadKg} to get getShipmentWithMaximumPackage`)
  }
}
