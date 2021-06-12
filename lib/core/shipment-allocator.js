import baseAllocationStrategy from './allocation-strategy'

export default function makeShipmentAllocator ({ maxLoadKg }) {
  function allocate (packages, strategy = baseAllocationStrategy) {
    if (!packages || !Array.isArray(packages)) {
      throw new TypeError('no valid packages provided to allocate shipment')
    }

    if (!strategy || typeof strategy !== 'function') {
      throw new TypeError('no allocation strategy provided to allocate the shipment')
    }
    return baseAllocationStrategy({ packages, maxLoadKg })
  }

  return {
    allocate
  }
}
