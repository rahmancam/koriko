/** @module Fleet */

import { makeVehicle } from '../models/vehicle'

/**
 * Fleet Priority Queue
 */
class FleetPriorityQueue {
  /**
   * @property {Array<Vehicle>} vehicles
   */
  vehicles = [];
  constructor ({ vehicles }) {
    this.vehicles = vehicles
  }

  /**
   * Enqueue vechicle based on available time hours
   * @param {Vehicle} vehicle
   */
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

  /**
   * Dequeue vehicles which is available first
   * @returns {Vehicle}
   */
  dequeue () {
    if (this.isEmpty()) {
      return null
    }
    return this.vehicles.shift()
  }

  /**
   * Get the size of queue
   * @returns {number}
   */
  size () {
    return this.vehicles?.length
  }

  /**
   * Check if queue if empty
   * @returns {boolean}
   */
  isEmpty () {
    return this.vehicles.length === 0
  }
}

/**
 * Factory function to create fleet priority queue
 * @param {FleetPriorityQueueOptions} options
 * @returns {FleetPriorityQueue} fleet priority queue
 */
export function makeFleetPriorityQueue ({ numberOfVehicles }) {
  const vehicles = Array(numberOfVehicles)
    .fill(0)
    .map((_, index) => makeVehicle({ id: index + 1 }))
  return new FleetPriorityQueue({ vehicles })
}

export default FleetPriorityQueue
