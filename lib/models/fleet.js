/** @module Fleet */

import validateFleetOrThrowError from '../helpers/validate-fleet'

/**
 * Fleet Class to hold fleet information
 */
class Fleet {
    /**
     * @property {number} Number of Vehicles
     */
    numberOfVehicles = 0
    /**
     * @property {number} Max Speed Km/hr
     */
    maxSpeedKmPerHr = 0
    /**
     * @property {number} Max load in Kg
     */
    maxLoadKg = 0

    constructor ({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg }) {
      this.numberOfVehicles = parseInt(numberOfVehicles)
      this.maxSpeedKmPerHr = parseInt(maxSpeedKmPerHr)
      this.maxLoadKg = parseInt(maxLoadKg)
    }
}

/**
 * Factory function for making a new fleet
 * @param {FleetOptions} options
 * @returns {Fleet}
 */
export function makeFleet ({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg }) {
  validateFleetOrThrowError({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg })
  return new Fleet({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg })
}

export default Fleet
