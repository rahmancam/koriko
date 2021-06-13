import courierDb from '../db'

import { makeDeliveryEstimator } from '../lib'
import { makePackage } from '../lib/models/package'
import { makeFleet } from '../lib/models/fleet'

const coupons = courierDb.findAllCoupons()
const settings = courierDb.findAllSettings()

const getBaseCost = (text) => parseFloat(text.split(' ')[0])
const getTotalPackageCount = (text) => parseInt(text.split(' ')[1])
const getPackage = (text) => {
  const splitsText = text.split(' ')
  return {
    id: splitsText[0],
    weightKg: parseInt(splitsText[1]),
    distanceKm: parseInt(splitsText[2]),
    offerCode: splitsText?.[3]
  }
}

const getFleet = (text) => {
  const splitsText = text.split(' ')
  return {
    numberOfVehicles: parseInt(splitsText[0]),
    maxSpeedKmPerHr: parseInt(splitsText[1]),
    maxLoadKg: parseInt(splitsText[2])
  }
}

function handleEstimation (inputText, onCostEstimation = () => {}, onTimeEstimation = () => {}) {
  const { baseCost, packages, fleetDetail } = getParseInput(inputText)

  const estimator = makeDeliveryEstimator({ baseCost, coupons, settings })
  if (fleetDetail) {
    const shipments = estimator.estimateTime(packages, fleetDetail)
    return onTimeEstimation(shipments)
  }
  const packagesWithCost = estimator.estimateCost(packages)
  return onCostEstimation(packagesWithCost)
}

export function getAllPackagesFromShipments (shipments) {
  return shipments.reduce((acc, shipment) => acc.concat(shipment.packages), [])
}

/**
 * Parse Input and returns Package, Fleet and Basecost
 */
function getParseInput (inputText) {
  if (!inputText || inputText.trim().length === 0) {
    throw new Error('Invalid input, please provide package details')
  }

  let baseCost = 0
  let numberOfPackages = 0
  const packages = []
  let fleetDetail = null
  const splitsText = inputText.trim().split('\n')

  try {
    baseCost = getBaseCost(splitsText[0])
    numberOfPackages = getTotalPackageCount(splitsText[0])
    if (isNaN(baseCost) || isNaN(numberOfPackages)) {
      throw new Error('provide correct input in numbers: BASE_COST NO_OF_PACKAGES')
    }
  } catch (err) {
    throw new Error('provide correct input: BASE_COST NO_OF_PACKAGES')
  }

  if (splitsText.length <= numberOfPackages) {
    throw new Error(`provide input valid number of package details : ${numberOfPackages}`)
  }

  try {
    for (let index = 1; index <= numberOfPackages; index++) {
      const packageItem = getPackage(splitsText[index])
      packages.push(makePackage(packageItem))
    }
  } catch (err) {
    throw new Error('provide correct package: PKG_ID WEIGHT DISTANCE [OFFER (optional)]')
  }

  try {
    if (splitsText[numberOfPackages + 1]) {
      const fleetInfo = getFleet(splitsText[numberOfPackages + 1])
      fleetDetail = makeFleet(fleetInfo)
    }
  } catch (err) {
    throw new Error('provide correct fleet detail: NO_VEHICLES MAX_SPEED MAX_LOAD')
  }

  return {
    baseCost,
    packages,
    fleetDetail
  }
}

export {
  handleEstimation
}
