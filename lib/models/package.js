export default class Package {
    id = '';
    weightInKg = 0;
    distanceInKm = 0;
    offerCode = '';

    constructor ({ id, weightInKg, distanceInKm, offerCode }) {
      this.id = id
      this.weightInKg = weightInKg
      this.distanceInKm = distanceInKm
      this.offerCode = offerCode
    }
}

export function makePackage ({ id, weightInKg, distanceInKm, offerCode }) {
  if (!id) {
    throw new TypeError(`Invalid package id : ${id}`)
  }

  if (!weightInKg || (typeof weightInKg) !== 'number' || weightInKg <= 0) {
    throw new TypeError(`Invalid package weight : ${weightInKg}`)
  }

  if (!distanceInKm || (typeof distanceInKm) !== 'number' || distanceInKm <= 0) {
    throw new TypeError(`Invalid package distance : ${distanceInKm}`)
  }

  // offer code is optional

  return new Package({ id, weightInKg, distanceInKm, offerCode })
}
