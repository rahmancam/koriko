import courierDb from '../../db'
import { makeDeliveryEstimator } from '../../lib'
import { getParseInput } from './parser'

const coupons = courierDb.findAllCoupons()
const settings = courierDb.findAllSettings()

/**
 * Handler to estimate Cost/Time
 * @param {string} inputText
 * @param {callback} onCostEstimation
 * @param {callback} onTimeEstimation
 * @returns void
 */
export function handleEstimation (inputText, onCostEstimation = () => {}, onTimeEstimation = () => {}) {
  const { baseCost, packages, fleetDetail } = getParseInput(inputText)

  const estimator = makeDeliveryEstimator({ baseCost, coupons, settings })
  if (fleetDetail) {
    const shipments = estimator.estimateTime(packages, fleetDetail)
    return onTimeEstimation(shipments)
  }
  const packagesWithCost = estimator.estimateCost(packages)
  return onCostEstimation(packagesWithCost)
}

/**
 * Get All packages from shipments
 * @param {Array<Shipment>} shipments
 * @returns {Array<Package>} list of packages
 */
export function getAllPackagesFromShipments (shipments) {
  return shipments.reduce((acc, shipment) => acc.concat(shipment.packages), [])
}
