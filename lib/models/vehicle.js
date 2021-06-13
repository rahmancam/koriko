/** @module Fleet */
import { v4 as uuid } from 'uuid'

/**
 * Vehcile class to hold vehicle information
 */
class Vehicle {
  /**
   *@property {number|string} Vechile Id
   */
  id = `${uuid()}`
  /**
   * @property {number} Available Time in Hours
   */
  availableTimeHrs = 0

  constructor ({ id, availableTimeHrs = 0 }) {
    this.id = id
    this.availableTimeHrs = availableTimeHrs
  }
}

/**
 * Factory function to make new Vehicle
 * @param {VehicleOptions} options
 * @returns {Vehicle}
 */
export function makeVehicle ({ id, availableTimeHrs = 0 }) {
  return new Vehicle({ id, availableTimeHrs })
}

export default Vehicle
