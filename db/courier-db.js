export default function makeCourierDb ({ makeDb }) {
  return Object.freeze({
    findAllCoupons
  })

  function findAllCoupons () {
    const db = makeDb()
    return db?.coupons
  }
}
