
/**
 * Write to std out stream
 * @param {string|Object} msg
 */
export function writeToStdOutput (msg) {
  if (typeof msg === 'string') {
    process.stdout.write(`${msg}\n`)
  } else {
    printTable(msg)
  }
}

/**
 * Format and print packages
 * @param {Array<Package>} packages
 * @param {boolean} includeEstimateTime
 */
export function printPackages (packages, includeEstimateTime = false) {
  let packagesInfo = packages?.map((item) => {
    const packageItem = {
      id: item.id,
      discount: `${item.discount} (${item.discountPercentage})%`,
      totalCost: item.totalCost
    }
    if (includeEstimateTime) {
      packageItem.deliveryEstimateTimeHrs = item.deliveryEstimateTimeHrs
    }
    return packageItem
  })
  if (includeEstimateTime) {
    packagesInfo = sortPackagesByEstimateDeliveryTime(packagesInfo)
  }
  writeToStdOutput(packagesInfo)
}

/**
 * Sort packages by delivery time`
 * @param {Array<Package>} packages
 * @returns {Array<Package>}
 */
export function sortPackagesByEstimateDeliveryTime (packages) {
  packages = [...packages]
  packages.sort((item1, item2) => item1.deliveryEstimateTimeHrs - item2.deliveryEstimateTimeHrs)
  return packages
}

/**
 * Print objects as table
 * @param {Array<Object>} objects
 */
export function printTable (objects) {
  console.table(objects)
}
