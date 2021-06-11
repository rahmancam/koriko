import { calculateDiscount } from './coupon-handler'
describe('Coupon handler', () => {
  test('Should calculate correct discount', () => {
    const discount = calculateDiscount(500, 25)
    expect(discount).toBe(125)
  })
})
