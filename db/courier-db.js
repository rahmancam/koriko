import validateSettingsOrThrowError from '../lib/helpers/validate-settings'

/**
 * Factory function to make a new storage instance
 * @param {Object} options
 * @returns {Object}
 */
export default function makeCourierDb ({ makeDb }) {
  return Object.freeze({
    findAllCoupons,
    findAllSettings
  })

  /**
   * Find all coupons
   * @returns {Objecg}
   */
  function findAllCoupons () {
    const db = makeDb()
    // coupons are optional
    return db?.coupons
  }

  /**
   * Find all settings
   * @returns {Object}
   */
  function findAllSettings () {
    const db = makeDb()
    validateSettingsOrThrowError(db)
    return db.settings
  }
}
