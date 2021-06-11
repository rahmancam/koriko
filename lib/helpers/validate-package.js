export default function validatePackageOrThrowError ({ id, weightInKg, distanceInKm, offerCode }) {
  if (!id) {
    throw new TypeError(`Invalid package id : ${id}`)
  }

  if (!weightInKg || (typeof weightInKg) !== 'number' || weightInKg <= 0) {
    throw new TypeError(`Invalid package weight : ${weightInKg}`)
  }

  if (!distanceInKm || (typeof distanceInKm) !== 'number' || distanceInKm <= 0) {
    throw new TypeError(`Invalid package distance : ${distanceInKm}`)
  }
}
