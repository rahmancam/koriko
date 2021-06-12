export default class Vehicle {
    id = 0
    availableTimeHrs = 0

    constructor ({ id, availableTimeHrs = 0 }) {
      this.id = id
      this.availableTimeHrs = availableTimeHrs
    }
}

export function makeVehicle ({ id, availableTimeHrs = 0 }) {
  return new Vehicle({ id, availableTimeHrs })
}
