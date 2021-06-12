export default function validateFleetOrThrowError ({ numberOfVehicles, maxSpeedKmPerHour, maxCarriableWeightKg }) {
  if (!numberOfVehicles || (typeof maxSpeedKmPerHour) !== 'number' || numberOfVehicles <= 0) {
    throw new TypeError(`Invalid number of fleet vehicles ${numberOfVehicles}`)
  }

  if (!maxSpeedKmPerHour || (typeof maxSpeedKmPerHour) !== 'number' || maxSpeedKmPerHour <= 0) {
    throw new TypeError(`Invalid fleet max speed per/hour: ${maxSpeedKmPerHour}`)
  }

  if (!maxCarriableWeightKg || (typeof maxCarriableWeightKg) !== 'number' || maxCarriableWeightKg <= 0) {
    throw new TypeError(`Invalid fleet max carriable weight : ${maxCarriableWeightKg}`)
  }
}
