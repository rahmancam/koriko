import { makeFleetPriorityQueue } from './fleet-priority-queue'

describe('Fleet Priority Queue', () => {
  let fleetPriorityQueue = null
  const numberOfVehicles = 3
  beforeEach(() => {
    fleetPriorityQueue = makeFleetPriorityQueue({ numberOfVehicles })
  })
  test('Should have valid number of vehicles in queue', () => {
    expect(fleetPriorityQueue.size()).toBe(numberOfVehicles)
  })

  test('Should insert at correct position on enqueue', () => {
    let vehicle = fleetPriorityQueue.dequeue()
    vehicle.availableTimeHrs = 1.56
    fleetPriorityQueue.enqueue(vehicle)
    vehicle = fleetPriorityQueue.dequeue()
    vehicle.availableTimeHrs = 3.2
    fleetPriorityQueue.enqueue(vehicle)
    vehicle = fleetPriorityQueue.dequeue()
    vehicle.availableTimeHrs = 1.35
    fleetPriorityQueue.enqueue(vehicle)
    expect(fleetPriorityQueue.dequeue().availableTimeHrs).toBe(1.35)
    expect(fleetPriorityQueue.dequeue().availableTimeHrs).toBe(1.56)
    expect(fleetPriorityQueue.dequeue().availableTimeHrs).toBe(3.2)
  })
})
