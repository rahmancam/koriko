/** @module Fleet */
import baseFleetAllocationStrategy from './fleet-allocation-strategy'

/**
 * Factory function to make a new Fleet allocator
 * @param {VehicleOptions} options
 * @returns {Object} Allocator API
 */
function makeFleetAllocator ({ maxSpeedKmPerHr, numberOfVehicles }) {
  /**
   * Allocate fleet to shipments and estimate time
   * @param {Array<Shipment>} shipments list of shipments
   * @param {function} [strategy] override allocation strategy (optional)
   * @returns {Array<Shipment>} allocated shipments with time estimation
   */
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

export default makeFleetAllocator
