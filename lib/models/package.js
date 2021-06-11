import validatePackageOrThrowError from '../helpers/validate-package'

export default class Package {
    id = '';
    weightInKg = 0;
    distanceInKm = 0;
    offerCode = '';
    cost = 0;
    discountPercentage = 0;
    discount = 0;
    totalCost = 0;

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

export function getPackageWithCost (packageItem, cost) {
  return {
    ...packageItem,
    cost,
    totalCost: cost
  }
}

export function getPackageWithDiscount (packageItem, discount, discountPercentage) {
  return {
    ...packageItem,
    discountPercentage: discountPercentage,
    discount,
    totalCost: packageItem.totalCost - discount
  }
}
