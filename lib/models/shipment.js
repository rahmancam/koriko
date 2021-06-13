/** @module Shipment */

import validateShipmentOrThrowError from '../helpers/validate-shipment'
import { v4 as uuid } from 'uuid'
/**
 * Shipment class to hold shipment information
 */
class Shipment {
    /**
     * @property {string} Shipment Id
     */
    id = `${uuid()}`
    /**
     * @property {Array<Package>} packages
     */
    packages = null

    constructor ({ packages }) {
      this.packages = packages
    }

    /**
     * Get shipmetn weight
     * @returns {number} Total shipment weight
     */
    getWeightkg () {
      return this.packages?.reduce((acc, item) => acc + item.weightKg, 0)
    }
}

/**
 * Factory function to make a new shipment
 * @param {ShipmentOptions} options shipment options
 * @returns {Shipment}
 */
export function makeShipment ({ packages }) {
  validateShipmentOrThrowError({ packages })
  return new Shipment({ packages })
}

export default Shipment
