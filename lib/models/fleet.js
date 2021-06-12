import validateFleetOrThrowError from '../helpers/validate-fleet'

export default class Fleet {
    numberOfVehicles = 0
    maxSpeedKmPerHour = 0
    maxCarriableWeightKg = 0

    constructor ({ numberOfVehicles, maxSpeedKmPerHour, maxCarriableWeightKg }) {
      this.numberOfVehicles = numberOfVehicles
      this.maxSpeedKmPerHour = maxSpeedKmPerHour
      this.maxCarriableWeightKg = maxCarriableWeightKg
    }
}

export function makeFleet ({ numberOfVehicles, maxSpeedKmPerHour, maxCarriableWeightKg }) {
  validateFleetOrThrowError({ numberOfVehicles, maxSpeedKmPerHour, maxCarriableWeightKg })
  return new Fleet({ numberOfVehicles, maxSpeedKmPerHour, maxCarriableWeightKg })
}
