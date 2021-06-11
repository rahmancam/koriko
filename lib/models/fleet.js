import validateFleetOrThrowError from '../helpers/validate-fleet'

export default class Fleet {
    numberOfVehicles = 0
    maxSpeedInKmPerHour = 0
    maxCarriableWeightInKg = 0

    constructor ({ numberOfVehicles, maxSpeedInKmPerHour, maxCarriableWeightInKg }) {
      this.numberOfVehicles = numberOfVehicles
      this.maxSpeedInKmPerHour = maxSpeedInKmPerHour
      this.maxCarriableWeightInKg = maxCarriableWeightInKg
    }
}

export function makeFleet ({ numberOfVehicles, maxSpeedInKmPerHour, maxCarriableWeightInKg }) {
  validateFleetOrThrowError({ numberOfVehicles, maxSpeedInKmPerHour, maxCarriableWeightInKg })
  return new Fleet({ numberOfVehicles, maxSpeedInKmPerHour, maxCarriableWeightInKg })
}
