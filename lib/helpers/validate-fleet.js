export default function validateFleetOrThrowError ({ numberOfVehicles, maxSpeedKmPerHr, maxLoadKg }) {
  if (!numberOfVehicles || (typeof numberOfVehicles) !== 'number' || numberOfVehicles <= 0) {
    throw new TypeError(`Invalid number of fleet vehicles ${numberOfVehicles}`)
  }

  if (!maxSpeedKmPerHr || (typeof maxSpeedKmPerHr) !== 'number' || maxSpeedKmPerHr <= 0) {
    throw new TypeError(`Invalid fleet max speed per/hour: ${maxSpeedKmPerHr}`)
  }

  if (!maxLoadKg || (typeof maxLoadKg) !== 'number' || maxLoadKg <= 0) {
    throw new TypeError(`Invalid fleet max carriable weight : ${maxLoadKg}`)
  }
}
