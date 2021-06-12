import validateFleetOrThrowError from '../helpers/validate-fleet'

export default class Fleet {
    numberOfVehicles = 0
    maxSpeedKmPerHr = 0
    maxLoadKg = 0

    constructor ({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg }) {
      this.numberOfVehicles = parseInt(numberOfVehicles)
      this.maxSpeedKmPerHr = parseInt(maxSpeedKmPerHr)
      this.maxLoadKg = parseInt(maxLoadKg)
    }
}

export function makeFleet ({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg }) {
  validateFleetOrThrowError({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg })
  return new Fleet({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg })
}
