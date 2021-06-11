import validateSettingsOrThrowError from '../lib/helpers/validate-settings'

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
    validateSettingsOrThrowError(db)
    return db.settings
  }
}
