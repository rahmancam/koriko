import makeFleetAllocator from './fleet-allocator'

describe('Fleet Allocator', () => {
  const maxSpeedKmPerHr = 70
  const numberOfVehicles = 2
  let shipments = null
  beforeEach(() => {
    shipments = [{
      id: 1,
      packages: [
        {
          id: 'PKG2',
          weightKg: 75,
          distanceKm: 125
        },
        {
          id: 'PKG4',
          weightKg: 110,
          distanceKm: 60
        }]
    },
    {
      id: 2,
      packages: [
        {
          id: 'PKG3',
          weightKg: 175,
          distanceKm: 100
        }]
    },
    {
      id: 3,
      packages: [
        {
          id: 'PKG5',
          weightKg: 155,
          distanceKm: 95
        }]
    },
    {
      id: 4,
      packages: [
        {
          id: 'PKG1',
          weightKg: 50,
          distanceKm: 30
        }]
    }]
  })
  test('Should estimate time correctly', () => {
    const fleetAllocator = makeFleetAllocator({ maxSpeedKmPerHr, numberOfVehicles })
    const shipmentsWithEstimation = fleetAllocator.allocate(shipments)
    expect(shipmentsWithEstimation[0].packages[0].deliveryEstimateTimeHrs).toBe(1.78)
    expect(shipmentsWithEstimation[0].packages[1].deliveryEstimateTimeHrs).toBe(0.85)
    expect(shipmentsWithEstimation[1].packages[0].deliveryEstimateTimeHrs).toBe(1.42)
    expect(shipmentsWithEstimation[2].packages[0].deliveryEstimateTimeHrs).toBe(4.19)
    expect(shipmentsWithEstimation[3].packages[0].deliveryEstimateTimeHrs).toBe(3.98)
  })
})
