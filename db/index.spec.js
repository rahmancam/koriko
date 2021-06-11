import { makeDb } from './index'

describe('DB', () => {
  test('Should return valid data', () => {
    const testDbData = { coupons: [{ code: 'OFF001' }] }
    const dbData = makeDb(testDbData)
    expect(dbData).toEqual(testDbData)
  })

  test('Should return valid coupons', () => {
    const testDbData = { coupons: [{ code: 'OFF001' }, { code: 'OFF002' }] }
    const dbData = makeDb(testDbData)
    expect(dbData.coupons).toEqual(testDbData.coupons)
  })

  test('Should return no coupons if not configured', () => {
    const testDbData = { }
    const dbData = makeDb(testDbData)
    expect(dbData.coupons).not.toBeDefined()
  })
})
