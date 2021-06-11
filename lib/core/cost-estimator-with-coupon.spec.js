import baseEstimatorWithCoupon from './cost-estimator-with-coupon'

describe('Base Cost Estimator With Coupon', () => {
  test('Should throw error if no estimator provided', () => {
    expect(() => {
      baseEstimatorWithCoupon({ estimator: null })
    }).toThrow(TypeError)
  })
})
