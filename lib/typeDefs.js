/**
 * @typedef {Object} Settings
 * @property {number} costPerKg - Cost per Kg
 * @property {number} costPerKm - Cost per km
 */

/**
 * @typedef {Object} Coupon
 * @property {string} code - Coupon code
 * @property {number} discountPercentage - Discount percentage
 * @property {number} minDistanceKm - Minimum Distance Km Criteria
 * @property {number} maxDistanceKm - Maximum Distance Km Criteria
 * @property {number} minWeightKg - Minimum Weight Km Criteria
 * @property {number} maxWeightKg - Maximum Weight Km Criteria
 */

/**
 * @typedef {Object} CostEstimatorOptions
 * @property {number} baseCost - Base cost
 * @property {Package} packageItem - Package instance
 * @property {Settings} settings - Settings
 */

/**
 * @typedef {Object} CostEstimatorWithCouponOptions
 * @property {number} baseCost - Base cost
 * @property {Package} packageItem - Package instance
 * @property {Settings} settings - Settings
 * @property {Array<Coupon>} coupons - list of available coupons
 * @property {Function} [estimator] - Custom cost estimator
 */

/**
 * @typedef {Object} EstimatorOptions
 * @property {number} baseCost - Base cost
 * @property {Settings} settings - Settings
 * @property {Array<Coupon>} coupons - list of available coupons
 * @property {Function} [estimator] - Custom cost estimator
 */

/**
 * @typedef {Object} FleetOptions
 * @property {number} numberOfVehicles - Number of vehicles
 * @property {number} maxSpeedKmPerHr - Max speed km/hr
 * @property {number} maxLoadKg - Max load Kg
 */

/**
 * @typedef {Object} Package
 * @property {number} id - Package Id
 * @property {string} weightKg - Weight in Kg
 * @property {string} distanceKm - Distance in Km
 * @property {number} discount - Discount
 * @property {number} discountPercentage - Discount percentage
 * @property {number} deliveryEstimateTimeHrs - Delivery Estimation Hours
 * @property {number} cost - Cost of delivery
 * @property {number} totalCost - Total cost of delivery
 * @property {string} [offerCode] - coupon code (optional)
 */

/**
 * @typedef {Object} PackageOptions
 * @property {number} id - Package Id
 * @property {string} weightKg - Weight in Kg
 * @property {string} distanceKm - Distance in Km
 * @property {string} [offerCode] - coupon code (optional)
 */

/**
 * @typedef {Object} ShipmentOptions
 * @property {Array<Package>} packages - List of packages
 */

/**
 * @typedef {Object} VehicleOptions
 * @property {number|string} id - Vehicle Id
 * @property {number} [availableTimeHrs] - Available Time in Hours (optional)
 */

/**
 * @typedef {Object} EstimatorAPI
 * @property {number} estimateTime - estimate time API
 * @property {number} estimateCost - estimate cost API
 */

export default {}
