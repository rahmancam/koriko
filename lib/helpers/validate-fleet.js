export default function validateFleetOrThrowError ({ numberOfVehicles, maxSpeedInKmPerHour, maxCarriableWeightInKg }) {
  if (!numberOfVehicles || (typeof maxSpeedInKmPerHour) !== 'number' || numberOfVehicles <= 0) {
    throw new TypeError(`Invalid number of fleet vehicles ${numberOfVehicles}`)
  }

  if (!maxSpeedInKmPerHour || (typeof maxSpeedInKmPerHour) !== 'number' || maxSpeedInKmPerHour <= 0) {
    throw new TypeError(`Invalid fleet max speed per/hour: ${maxSpeedInKmPerHour}`)
  }

  if (!maxCarriableWeightInKg || (typeof maxCarriableWeightInKg) !== 'number' || maxCarriableWeightInKg <= 0) {
    throw new TypeError(`Invalid fleet max carriable weight : ${maxCarriableWeightInKg}`)
  }
}
