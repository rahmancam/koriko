import baseShipmentAllocationStrategy from './shipment-allocation-strategy'
import maximizeByNumberOfPackage from './maximize-by-package'
import makeShipmentAllocator from './shipment-allocator'
import makeFleetAllocator from './fleet-allocator'

export default function baseShipmentEstimator (packages, fleetDetail,
  maximizeBy = maximizeByNumberOfPackage,
  strategy = baseShipmentAllocationStrategy) {
  const shipmentAllocator = makeShipmentAllocator(fleetDetail)
  const fleetAllocator = makeFleetAllocator(fleetDetail)
  const shipments = shipmentAllocator.allocate(packages, strategy)
  return fleetAllocator.allocate(shipments)
}
