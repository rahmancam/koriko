export default function validateFleetOrThrowError ({ numberOfVehicles, maxSpeedKmPerHour, maxLoadKg }) {
  if (!numberOfVehicles || (typeof maxSpeedKmPerHour) !== 'number' || numberOfVehicles <= 0) {
    throw new TypeError(`Invalid number of fleet vehicles ${numberOfVehicles}`)
  }

  if (!maxSpeedKmPerHour || (typeof maxSpeedKmPerHour) !== 'number' || maxSpeedKmPerHour <= 0) {
    throw new TypeError(`Invalid fleet max speed per/hour: ${maxSpeedKmPerHour}`)
  }

  if (!maxLoadKg || (typeof maxLoadKg) !== 'number' || maxLoadKg <= 0) {
    throw new TypeError(`Invalid fleet max carriable weight : ${maxLoadKg}`)
  }
}
