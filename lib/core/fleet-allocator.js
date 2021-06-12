import baseFleetAllocationStrategy from './fleet-allocation-strategy'

export default function makeFleetAllocator ({ maxSpeedKmPerHr, numberOfVehicles }) {
  function allocate (shipments, strategy = baseFleetAllocationStrategy) {
    if (!shipments || !Array.isArray(shipments)) {
      throw new TypeError('no valid shipments provided to allocate fleet')
    }

    if (!strategy || typeof strategy !== 'function') {
      throw new TypeError('no allocation strategy provided to allocate the fleet')
    }
    return strategy({ shipments, maxSpeedKmPerHr, numberOfVehicles })
  }

  return {
    allocate
  }
}
