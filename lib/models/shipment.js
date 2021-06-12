import validateShipmentOrThrowError from '../helpers/validate-shipment'
import { uuid } from 'uuidv4'

export default class Shipment {
    id = `${uuid()}`
    packages = null

    constructor ({ packages }) {
      this.packages = packages
    }

    getWeightkg () {
      return this.packages?.reduce((acc, item) => acc + item.weightKg, 0)
    }
}

export function makeShipment ({ packages }) {
  validateShipmentOrThrowError({ packages })
  return new Shipment({ packages })
}
