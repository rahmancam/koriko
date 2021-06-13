/** @module Estimator */

import baseShipmentAllocationStrategy from './shipment-allocation-strategy'
import maximizeByNumberOfPackage from './maximize-by-package'
import makeShipmentAllocator from './shipment-allocator'
import makeFleetAllocator from './fleet-allocator'
import baseFleetAllocationStrategy from './fleet-allocation-strategy'

/**
 * Base shipment estimator
 * @param {Array<Package>} packages list of packages
 * @param {FleetOptions} fleetDetail fleet detail
 * @param {function} [maximizeBy] maximize packages by. (default=number of packages)
 * @param {function} [strategy] override shipment allocation strategy
 * @returns {Array<Shipment>} list of shipments with estimation
 */
function baseShipmentEstimator (packages, fleetDetail,
  maximizeBy = maximizeByNumberOfPackage,
  shipment_strategy = baseShipmentAllocationStrategy,
  fleet_strategy = baseFleetAllocationStrategy) {
  const shipmentAllocator = makeShipmentAllocator(fleetDetail, maximizeBy)
  const fleetAllocator = makeFleetAllocator(fleetDetail)
  const shipments = shipmentAllocator.allocate(packages, shipment_strategy)
  return fleetAllocator.allocate(shipments, fleet_strategy)
}

export default baseShipmentEstimator
