export default function validatePackageOrThrowError ({ id, weightKg, distanceKm, offerCode }) {
  if (!id) {
    throw new TypeError(`Invalid package id : ${id}`)
  }

  if (!weightKg || (typeof weightKg) !== 'number' || weightKg <= 0) {
    throw new TypeError(`Invalid package weight : ${weightKg}`)
  }

  if (!distanceKm || (typeof distanceKm) !== 'number' || distanceKm <= 0) {
    throw new TypeError(`Invalid package distance : ${distanceKm}`)
  }
}
