import baseShipmentAllocationStrategy from './shipment-allocation-strategy'

export default function makeShipmentAllocator ({ maxLoadKg }) {
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
