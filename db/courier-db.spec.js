import makeCourierDb from './courier-db'

describe('Courier DB', () => {
  let makeDb = null

  beforeEach(() => {
    makeDb = function () {
      return { coupons: [{ code: 'OFF001' }, { code: 'OFF002' }] }
    }
  })
  test('Should return valid coupons if configured', () => {
    const courierDB = makeCourierDb({ makeDb })
    const allCoupons = courierDB.findAllCoupons()
    expect(makeDb().coupons).toEqual(allCoupons)
  })

  test('Should return no coupons if not configured', () => {
    const makeDb = () => ({})
    const courierDB = makeCourierDb({ makeDb })
    const allCoupons = courierDB.findAllCoupons()
    expect(makeDb().coupons).toEqual(allCoupons)
  })
})
