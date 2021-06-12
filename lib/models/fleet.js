import validateFleetOrThrowError from '../helpers/validate-fleet'

export default class Fleet {
    numberOfVehicles = 0
    maxSpeedKmPerHour = 0
    maxLoadKg = 0

    constructor ({ numberOfVehicles, maxSpeedKmPerHour, maxLoadKg }) {
      this.numberOfVehicles = numberOfVehicles
      this.maxSpeedKmPerHour = maxSpeedKmPerHour
      this.maxLoadKg = maxLoadKg
    }
}

export function makeFleet ({ numberOfVehicles, maxSpeedKmPerHour, maxLoadKg }) {
  validateFleetOrThrowError({ numberOfVehicles, maxSpeedKmPerHour, maxLoadKg })
  return new Fleet({ numberOfVehicles, maxSpeedKmPerHour, maxLoadKg })
}
