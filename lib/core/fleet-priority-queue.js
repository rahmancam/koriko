import { makeVehicle } from '../models/vehicle'

export default class FleetPriorityQueue {
    vehicles = [];
    constructor ({ vehicles }) {
      this.vehicles = vehicles
    }

    enqueue (vehicle) {
      let contains = false
      for (let index = 0; index < this.vehicles.length; index++) {
        if (this.vehicles[index].availableTimeHrs > vehicle.availableTimeHrs) {
          this.vehicles.splice(index, 0, vehicle)
          contains = true
          break
        }
      }

      if (!contains) {
        this.vehicles.push(vehicle)
      }
    }

    dequeue () {
      if (this.isEmpty()) {
        return null
      }
      return this.vehicles.shift()
    }

    size () {
      return this.vehicles?.length
    }

    isEmpty () {
      return this.vehicles.length === 0
    }
}

export function makeFleetPriorityQueue ({ numberOfVehicles }) {
  const vehicles = Array(numberOfVehicles)
    .fill(0)
    .map((_, index) => makeVehicle({ id: index + 1 }))
  return new FleetPriorityQueue({ vehicles })
}
