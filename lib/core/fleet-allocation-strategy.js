import { makeFleetPriorityQueue } from './fleet-priority-queue'

export default function baseFleetAllocationStrategy ({ shipments, numberOfVehicles, maxSpeedKmPerHr }) {
  return estimateTimeWithAllocation({ shipments, numberOfVehicles, maxSpeedKmPerHr })
}

export function estimateTimeWithAllocation ({ shipments, numberOfVehicles, maxSpeedKmPerHr }) {
  const fleetPriorityQueue = makeFleetPriorityQueue({ numberOfVehicles })
  const shipmentsQueue = [...shipments]
  const shipmentsWithEstimation = []

  while (shipmentsQueue.length) {
    const shipment = shipmentsQueue.shift()
    const vehicle = fleetPriorityQueue.dequeue()
    const packagesWithEstimate = shipment.packages.map((packageItem) => estimatePackageHours(packageItem, vehicle, maxSpeedKmPerHr))

    // update vechicle next available time
    const shipmentCompletionTimeHrs = Math.max(...getPackageEstimateHours(packagesWithEstimate))
    vehicle.availableTimeHrs = vehicle.availableTimeHrs + toFixed(2 * shipmentCompletionTimeHrs)

    // enqueue vehicle again in queue
    fleetPriorityQueue.enqueue(vehicle)

    shipment.completionTimeHrs = toFixed(shipmentCompletionTimeHrs)
    shipment.packages = packagesWithEstimate
    shipmentsWithEstimation.push(shipment)
  }

  return shipmentsWithEstimation
}

export function toFixed (number, n = 2) {
  const fixedNumber = number.toString().match(new RegExp(`^-?\\d+(?:\\.\\d{0,${n}})?`))
  return parseFloat(fixedNumber)
}

export function getPackageEstimateHours (packages) {
  return packages.map((item) => item.actualEstimateHrs)
}

export function estimatePackageHours (packageItem, vehicle, maxSpeedKmPerHr) {
  const actualEstimateHrs = (packageItem.distanceKm / maxSpeedKmPerHr)
  return {
    ...packageItem,
    actualEstimateHrs: toFixed(actualEstimateHrs),
    deliveryEstimateTimeHrs: toFixed(vehicle.availableTimeHrs + actualEstimateHrs)
  }
}
