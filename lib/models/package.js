import validatePackageOrThrowError from '../helpers/validate-package'

export default class Package {
    id = '';
    weightInKg = 0;
    distanceInKm = 0;
    offerCode = '';
    deliveryCost = 0

    constructor ({ id, weightInKg, distanceInKm, offerCode }) {
      this.id = id
      this.weightInKg = weightInKg
      this.distanceInKm = distanceInKm
      this.offerCode = offerCode
    }
}

export function makePackage ({ id, weightInKg, distanceInKm, offerCode }) {
  validatePackageOrThrowError({ id, weightInKg, distanceInKm, offerCode })
  return new Package({ id, weightInKg, distanceInKm, offerCode })
}
