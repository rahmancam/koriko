/** @module Fleet */

import { makeFleetPriorityQueue } from './fleet-priority-queue'

/**
 * Base Fleet Allocation Strategy
 * @param {FleetAllocatorOptions} options
 * @returns {Array<Shipment>} shipments with allocated packages
 */
function baseFleetAllocationStrategy ({ shipments, numberOfVehicles, maxSpeedKmPerHr }) {
  return estimateTimeWithAllocation({ shipments, numberOfVehicles, maxSpeedKmPerHr })
}

/**
 * Estimate shipment delivery time with allocation
 * @param {FleetAllocatorOptions} options
 * @returns {Array<Shipment>} shipments with allocated packages
 */
export function estimateTimeWithAllocation ({ shipments, numberOfVehicles, maxSpeedKmPerHr }) {
  const fleetPriorityQueue = makeFleetPriorityQueue({ numberOfVehicles })
  const shipmentsQueue = [...shipments]
  const shipmentsWithEstimation = []

  while (shipmentsQueue.length) {
    const shipment = shipmentsQueue.shift()
    const vehicle = fleetPriorityQueue.dequeue()
    const packagesWithEstimate = shipment.packages.map((packageItem) => getUpdatedDeliveryEstimationHours(packageItem, vehicle, maxSpeedKmPerHr))

    // update vechicle next available time
    const shipmentCompletionTimeHrs = Math.max(...getActualPackageEstimateHours(packagesWithEstimate))
    vehicle.availableTimeHrs = vehicle.availableTimeHrs + toFixed(2 * shipmentCompletionTimeHrs)

    // enqueue vehicle again in queue
    fleetPriorityQueue.enqueue(vehicle)

    shipment.completionTimeHrs = toFixed(shipmentCompletionTimeHrs)
    shipment.packages = packagesWithEstimate
    shipmentsWithEstimation.push(shipment)
  }

  return shipmentsWithEstimation
}

/**
 * Fix decimals to n
 * @param {number} number value
 * @param {number} n decimal places
 * @returns {number} fixed decimals number
 */
export function toFixed (number, n = 2) {
  const fixedNumber = number.toString().match(new RegExp(`^-?\\d+(?:\\.\\d{0,${n}})?`))
  return parseFloat(fixedNumber)
}

/**
 * Get Actual package estimate hours
 * @ignore
 * @param {Array<Package>} packages list of packages
 * @returns {Array<number>} actual estimate hours
 */
export function getActualPackageEstimateHours (packages) {
  return packages.map((item) => item.actualEstimateHrs)
}

/**
 * Get package actual and delivery estimated hours
 * @param {Package} packageItem package instance
 * @param {Vehicle} vehicle vechicle
 * @param {number} maxSpeedKmPerHr max speed km/hr
 * @returns {Package} updated package
 */
export function getUpdatedDeliveryEstimationHours (packageItem, vehicle, maxSpeedKmPerHr) {
  const actualEstimateHrs = (packageItem.distanceKm / maxSpeedKmPerHr)
  return {
    ...packageItem,
    actualEstimateHrs: toFixed(actualEstimateHrs),
    deliveryEstimateTimeHrs: toFixed(vehicle.availableTimeHrs + actualEstimateHrs)
  }
}

export default baseFleetAllocationStrategy
