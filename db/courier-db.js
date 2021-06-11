import InvalidConfigurationError from '../lib/errors/invalid-configuration-error'

export default function makeCourierDb ({ makeDb }) {
  return Object.freeze({
    findAllCoupons,
    findAllSettings
  })

  function findAllCoupons () {
    const db = makeDb()
    // coupons are optional
    return db?.coupons
  }

  function findAllSettings () {
    const db = makeDb()

    if (!db || !db.settings) {
      throw new InvalidConfigurationError('DB and settings are not configured')
    }

    if (!db.settings.costPerKg) {
      throw new InvalidConfigurationError('costPerKg is not configured in settings')
    }

    if (db.settings.costPerKg <= 0) {
      throw new InvalidConfigurationError('costPerKg should not be zero or negative')
    }

    if (!db.settings.costPerKm) {
      throw new InvalidConfigurationError('costPerKm is not configured in settings')
    }

    if (db.settings.costPerKm <= 0) {
      throw new InvalidConfigurationError('costPerKm should be zero or negative')
    }

    return db.settings
  }
}
