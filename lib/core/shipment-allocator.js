/** @module Shipment */

import baseShipmentAllocationStrategy from './shipment-allocation-strategy'

/**
 * Factory function to make a new shipment allocator
 * @param {ShipmentAllocatorOption} options
 */
export default function makeShipmentAllocator ({ maxLoadKg }) {
  /**
   * Allocate shipments to packages
   * @param {Array<Package>} packages list of packages
   * @param {function} [strategy] override shipment strategy (optional)
   * @returns {Array<Shipment>} list of shipments
   */
  function allocate (packages, strategy = baseShipmentAllocationStrategy) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to allocate shipment')
    }

    if (!strategy || typeof strategy !== 'function') {
      throw new TypeError('no allocation strategy provided to allocate the shipment')
    }
    return strategy({ packages, maxLoadKg })
  }

  return {
    allocate
  }
}
